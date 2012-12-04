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
			'length': self.sustainLengthDefault,
			'pk': self.pk,}
		return data


	def as_json(self):
		return json.dumps(self.as_data())
	
	def average_points(self):
		number_of_ratings = self.rating_set.count()
		if number_of_ratings:
			return float(str(1.0*sum([rating.points for rating in self.rating_set.all()])/number_of_ratings)[:4])
		else:
			return 0

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
			'pk': self.pk,
			}
		return data
	def as_data_song(self, song):
		data = self.as_data()
		data['shapes'] = [s.as_data() for s in song.shapes.all() if s in this.shapes.all()]
		return data

	def as_json(self):
		return json.dumps(self.as_data())
	
	def average_points(self):
		rated_shapes = [s for s in self.shapes.all() if s.rating_set.count() > 0]
		if rated_shapes:
			return float(str(sum([s.average_points() for s in rated_shapes])/len(rated_shapes))[:4])
		else:
			return 0

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
