from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
import random
from datetime import datetime 

class Player(models.Model):
	user = models.OneToOneField(User)
	bio = models.CharField(max_length=300)
	points = models.IntegerField(null=True,blank=True)
	def __unicode__(self):
		return self.user.username

	def getStarterPallette(self):
		from slugs.models import Shape, Slug, Sound
		shape1 = Shape(attack=0.01, decay= 0.01, sustainLevel=0.8, sustainLengthDefault=1, release=0.4,shape='shape', name='shape', last_used = datetime.now())
		shape1.save()
		slug1 = Slug(owner = self, name="%s's 1st slug"%(self.__unicode__()), birthday = datetime.now(), color = random.randint(0,180))
		slug1.save()
		sound1 = Sound(waveForm = 'sine', amp=0.5, overTones = "[[1,1]]", noise=0,slug=slug1)
		sound1.save()

		shape2 = Shape(attack=0.01, decay= 0.01, sustainLevel=0.8, sustainLengthDefault=1, release=0.4,shape='shape', name='shape', last_used = datetime.now())
		shape2.save()
		slug2 = Slug(owner = self, name="%s's 2nd slug"%(self.__unicode__()), birthday = datetime.now(), color = random.randint(0,180))
		slug2.save()
		sound2 = Sound(waveForm = 'square', amp=0.5, overTones = "[[1,1], [3,3],[5,5]]", noise=0,slug=slug2)
		sound2.save()
		
		shape3 = Shape(attack=0.01, decay= 0.01, sustainLevel=0.8, sustainLengthDefault=1, release=0.4,shape='shape', name='shape', last_used = datetime.now())
		shape3.save()
		slug3 = Slug(owner = self, name="%s's 3rd slug"%(self.__unicode__()), birthday = datetime.now(), color = random.randint(0,180))
		slug3.save()
		sound3 = Sound(waveForm = 'sine', amp=0.5, overTones = "[[1,1]]", noise=0,slug=slug3)
		sound3.save()

		shape4 = Shape(attack=0.01, decay= 0.01, sustainLevel=0.8, sustainLengthDefault=1, release=0.4,shape='shape', name='shape', last_used = datetime.now())
		shape4.save()
		slug4 = Slug(owner = self, name="%s's 4th slug"%(self.__unicode__()), birthday = datetime.now(), color = random.randint(0,180))
		slug4.save()
		sound4 = Sound(waveForm = 'square', amp=0.5, overTones = "[[1,1], [3,3],[5,5]]", noise=0,slug=slug4)
		sound4.save()



def create_player_user_callback(sender, instance, **kwargs):
	player, new = Player.objects.get_or_create(user=instance, points = 17)


post_save.connect(create_player_user_callback, User)
