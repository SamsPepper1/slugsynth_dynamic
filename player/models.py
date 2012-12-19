from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from slugs.slugMaker import makeStarterPallette

class PlayerManager(models.Manager):
	def get_username(self, username):
		return self.get(user=User.objects.get(username=username))


class Player(models.Model):
	user = models.OneToOneField(User)
	bio = models.CharField(max_length=300)
	points = models.IntegerField(null=True,blank=True)
	avatar = models.ImageField(upload_to='users/avatars',null=True, blank=True)
	objects = PlayerManager()
	class Meta:
		ordering = ['-points']
	def __unicode__(self):
		return self.user.username

	#def save(self, *args, **kwargs):
	#	try:
	#		existing = Player.objects.get(user=self.user)
	#		self.id = existing.id
	#	except Player.DoesNotExist:
	#		pass
	#	models.Model.save(self, *args, **kwargs)

	def getStarterPallette(self):
		makeStarterPallette(self)

	def slug_count(self):
		return self.slug_set.count()

	def loop_count(self):
		return self.loop_set.count()


def create_player_user_callback(sender, instance, **kwargs):
	player, new = Player.objects.get_or_create(user=instance, points = 17)

post_save.connect(create_player_user_callback, User)

