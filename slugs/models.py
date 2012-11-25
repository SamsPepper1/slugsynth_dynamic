from django.db import models
from player.models import Player
from slugs import helpers
import json

class Shape(models.Model):
	name = models.CharField(max_length=30)
	last_used = models.DateTimeField()
	shape = models.CharField(max_length=4000)
	attack = models.FloatField()
	decay = models.FloatField()
	sustainLevel = models.FloatField()
	release = models.FloatField()
	sustainLengthDefault = models.FloatField()

	class Meta:
		ordering = ['-last_used']
	def __unicode__(self):
		return self.name

	def as_data(self):
		data = {
			'name': self.name,
			'A': self.attack,
			'D': self.decay,
			'S': self.sustainLevel,
			'R': self.release,
			'shape': self.shape,
			'length': self.sustainLengthDefault}
		return data


	def as_json(self):
		return json.dumps(self.as_data())


class Slug(models.Model):
	owner = models.ForeignKey(Player)
	name = models.CharField(max_length=30)
	birthday = models.DateTimeField()
	color = models.IntegerField()
	shapes = models.ManyToManyField(Shape)
	
	def __unicode__(self):
		return self.name

	def as_data(self):
		data = {
			'owner': self.owner.__unicode__(),
			'name': self.name,
			'birthday': self.birthday.ctime(),
			'color': self.color,
			'shapes': [s.as_data() for s in self.shapes.all()],
			'sound': self.sound.as_data(),
			}
		return data

	def as_json(self):
		return json.dumps(self.as_data())
	
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

	def as_data(self):
		data = {
			'waveForm': self.waveForm,
			'amp': self.amp,
			'overTones': self.overTones,
			'noise': self.noise,
			}
		return data

	def as_json(self):
		return json.dumps(self.as_data())
