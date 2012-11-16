from django.db import models
from player.models import Player
from slugs import helpers

class Shape(models.Model):
	name = models.CharField(max_length=30)
	last_used = models.DateTimeField()
	shape = models.CharField(max_length=100)
	attack = models.DecimalField(max_digits=4, decimal_places = 3)
	decay = models.DecimalField(max_digits=4, decimal_places = 3)
	sustainLevel = models.DecimalField(max_digits=4, decimal_places = 3)
	release = models.DecimalField(max_digits=4, decimal_places = 3)
	sustainLengthDefault = models.DecimalField(max_digits=4, decimal_places = 3)

	def __unicode__(self):
		return self.name



class Slug(models.Model):
	owner = models.ForeignKey(Player)
	name = models.CharField(max_length=30)
	birthday = models.DateTimeField()
	color = models.IntegerField()
	shapes = models.ManyToManyField(Shape)
	
	def __unicode__(self):
		return self.name

class Sound(models.Model):
	WAVEFORM_CHOICES = (
		('si', 'sine'),
		('sq','square'),
		)
	waveForm = models.CharField(max_length=5, choices=WAVEFORM_CHOICES)
	amp = models.FloatField()
	overTones = models.CharField(max_length=100)
	noise = models.FloatField()
	slug = models.OneToOneField(Slug, primary_key=True)

	def __unicode__(self):
		return self.slug.name +"'s Sound"
