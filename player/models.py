from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save

class Player(models.Model):
	user = models.OneToOneField(User)
	bio = models.CharField(max_length=300)
	slugs = models.CharField(max_length=20)
	songs = models.CharField(max_length=20)
	comments = models.CharField(max_length=20)
	votes = models.CharField(max_length=20)

	def __unicode__(self):
		return self.user.username
