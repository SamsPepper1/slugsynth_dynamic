from django.db import models
from slugs.models import Shape, Slug, Sound
from django.utils import simplejson
from player.models import Player

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
