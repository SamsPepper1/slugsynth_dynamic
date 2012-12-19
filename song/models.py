from django.db import models
from slugs.models import Shape, Slug, Sound
from django.utils import simplejson
from player.models import Player
from tagging.fields import TagField
from tagging.models import Tag


class PublicLoopManager(models.Manager):
	def get_query_set(self):
		return super(PublicLoopManager,self).get_query_set().filter(public=True)

class PublicEditLoopManager(models.Manager):
	def get_query_set(self):
		return super(PublicEditLoopManager,self).get_query_set().filter(public_edit=True)

# Create your models here.
class Loop(models.Model):
	SCALES = (
		('Ma','Major'),
		('Mi','Minor'),
		('mPent','Minor Pentatonic'),
		('MPent','Major Pentatonic'),
		)
	creator = models.ForeignKey(Player)
	name = models.CharField(max_length=60)
	last_used = models.DateTimeField()
	scale = models.CharField(max_length=20, choices=SCALES)
	tempo = models.IntegerField()
	length = models.IntegerField()
	notes = models.TextField()
	shapes = models.ManyToManyField(Shape)
	public = models.BooleanField()
	public_edit = models.BooleanField()
	avScore = models.FloatField(default=0)
	thumbnail = models.ImageField(upload_to='songs/thumbnails',null=True,blank=True)
	parent = models.OneToOneField('self', parent_link=True,null=True, blank=True)

	objects = models.Manager()
	public_posts = PublicLoopManager()
	public_edit_posts = PublicEditLoopManager()
	tags = TagField()
	class Meta:
		ordering = ['-avScore', '-last_used']
	def __unicode__(self):
		return self.name
	def addShapes(self):
		notes = simplejson.loads(self.notes)
		for n in notes:
			shape = n['envpk']
			if not shape in self.shapes.all():
				self.shapes.add(shape)

	def get_slugs(self):
		return set([shape.slug_set.all()[0] for shape in self.shapes.all()])


	def re_save(self):
		tags = ' '.join([tag.__unicode__() for tag in self.get_tags()])
		self.save()
		self.set_tags(tags)

				


	def as_data(self):
		data = {}
		data['slugs'] = []
		for slug in self.get_slugs():
			slug_data = slug.as_data()
			slug_data['shapes'] = [shape.as_data() for shape in self.shapes.all() if shape in slug.shapes.all()]
			data['slugs'].append(slug_data)
		data['notes'] = self.notes
		data['tempo'] = self.tempo
		data['scale'] = self.scale
		data['length'] = self.length
		data['name'] = self.name
		data['creator'] = self.creator.__unicode__()
		if self.parent:
			data['parentSong'] = self.parent.__unicode__()
		else: 
			data['parentSong'] = 0
		return data
	def update_average_points(self):
		number_of_ratings = self.rating_set.count()
		if number_of_ratings:
			self.avScore = float(str(1.0*sum([rating.points for rating in self.rating_set.all()])/number_of_ratings))
			self.re_save()
		else:
			pass
	def average_points(self):
		return float(str(self.avScore)[:4])
		
	def get_tags(self):
		return Tag.objects.get_for_object(self)

	def set_tags(self, tags):
		Tag.objects.update_tags(self, tags)

	def already_rated(self):
		return [p.player for p in self.rating_set.all()]
