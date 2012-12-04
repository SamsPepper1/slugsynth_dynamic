from django.db import models
from slugs.models import Shape
from song.models import Loop
from player.models import Player
# Create your models here.


class SongRatingManager(models.Manager):
	def get_query_set(self):
		return super(SongRatingManager,self).get_query_set().filter(model = 'song')

class ShapeRatingManager(models.Manager):
	def get_query_set(self):
		return super(SongRatingManager,self).get_query_set().filter(model = 'shape')



class Rating(models.Model):
	MODELS = (
		('song','song'),
		('shape','shape')
		)
	POINTS = [(i,i) for i in range(6)]
	model = models.CharField(max_length = 5, choices = MODELS)
	points = models.PositiveSmallIntegerField(choices=POINTS)
	song = models.ForeignKey(Loop, null=True)
	shape = models.ForeignKey(Shape, null=True)
	player = models.ForeignKey(Player)
	comment = models.TextField()

	def save(self):
		rater = self.player
		rater.points += 1
		rater.save()
		if self.model == 'song':
			rated = self.song.creator
			rated.points += self.points
			rated.save()
		elif self.model == 'shape':
			rated = self.shape.slug_set.all()[0].owner
			rated.points += self.points
			rated.save()
		super(Rating, self).save()

		
