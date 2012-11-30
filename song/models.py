from django.db import models
from slugs.models import Shape, Slug, Sound

# Create your models here.
class Loop(models.Model):
	SCALES = (
		('Ma','Major'),
		('Mi','Minor'),
		('mPent','Minor Pentatonic')
		)
	name = models.CharField(max_length=60)
	last_used = models.DateTimeField()
	scale = models.CharField(max_length=20, choices=SCALES)
	tempo = models.IntegerField()
	length = models.IntegerField()
	notes = models.TextField()
	shapes = models.ManyToManyField(Shape)
