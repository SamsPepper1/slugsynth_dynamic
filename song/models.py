from django.db import models
from slugs.models import Shape, Slug, Sound
from django.utils import simplejson
from player.models import Player


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
		('mPent','Minor Pentatonic')
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

	objects = models.Manager()
	public_posts = PublicLoopManager()
	public_edit_posts = PublicEditLoopManager()
	class Meta:
		ordering = ['last_used']
	def __unicode__(self):
		return self.name
	def addShapes(self):
		notes = simplejson.loads(self.notes)
		for n in notes:
			shape = n['envpk']
			if not shape in self.shapes.all():
				self.shapes.add(shape)

	def get_slugs(self):
		return [shape.slug_set.all()[0] for shape in self.shapes.all()]		
	def save(self):
		super(Loop, self).save()
		self.addShapes()

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
		return data
	def average_points(self):
		number_of_ratings = self.rating_set.count()
		if number_of_ratings:
			return float(str(1.0*sum([rating.points for rating in self.rating_set.all()])/number_of_ratings)[:4])
		else:
			return 0
