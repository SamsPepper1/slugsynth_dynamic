from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
import random
from datetime import datetime 
import json
from urllib2 import urlopen
from BeautifulSoup import BeautifulSoup

class Player(models.Model):
	user = models.OneToOneField(User)
	bio = models.CharField(max_length=300)
	points = models.IntegerField(null=True,blank=True)
	avatar = models.ImageField(upload_to='users/avatars',null=True, blank=True)
	def __unicode__(self):
		return self.user.username

	def getStarterPallette(self):
		from slugs.models import Shape, Slug, Sound
		names = randomNames()
		shape1 = Shape(attack=0.06, decay= 0.08, sustainLevel=0.71, sustainLengthDefault=17180, release=0.1,shape=DEFAULT_SLUG_PATH, name='shape', last_used = datetime.now())
		shape1.save()
		slug1 = Slug(owner = self, name=names[0], birthday = datetime.now(), color = random.randint(0,180))
		slug1.save()
		sound1 = Sound(waveForm = 'sine', amp=0.2, overTones = "[[1,1],[2,2],[4,4],[8,8],[16,16]]", noise=0,slug=slug1)
		sound1.save()
		slug1.shapes.add(shape1)
		slug1.save()

		shape2 = Shape(attack=0.06, decay= 0.08, sustainLevel=0.71, sustainLengthDefault=17180, release=0.1,shape=DEFAULT_SLUG_PATH, name='shape', last_used = datetime.now())
		shape2.save()
		slug2 = Slug(owner = self, name=names[1], birthday = datetime.now(), color = random.randint(0,180))
		slug2.save()
		sound2 = Sound(waveForm = 'square', amp=0.15, overTones = "[[1,1]]", noise=0,slug=slug2)
		sound2.save()
		slug2.shapes.add(shape2)
		slug2.save()

	
		shape3 = Shape(attack=0.06, decay= 0.08, sustainLevel=0.71, sustainLengthDefault=17180, release=0.1,shape=DEFAULT_SLUG_PATH, name='shape', last_used = datetime.now())
		shape3.save()
		slug3 = Slug(owner = self, name=names[2], birthday = datetime.now(), color = random.randint(0,180))
		slug3.save()
		sound3 = Sound(waveForm = 'sine', amp=0.2, overTones = "[[1,1], [3,3],[5,5],[7,7],[9,9]]", noise=0,slug=slug3)
		sound3.save()
		slug3.shapes.add(shape3)
		slug3.save()


		shape4 = Shape(attack=0.06, decay= 0.08, sustainLevel=0.71, sustainLengthDefault=17180, release=0.1,shape=DEFAULT_SLUG_PATH, name='shape', last_used = datetime.now())
		shape4.save()
		slug4 = Slug(owner = self, name=names[3], birthday = datetime.now(), color = random.randint(0,180))
		slug4.save()
		sound4 = Sound(waveForm = 'sine', amp=0.15, overTones = "[[1,1], [3.2,3],[4.9,5],[7.132,4]]", noise=0,slug=slug4)
		sound4.save()
		slug4.shapes.add(shape4)
		slug4.save()




def create_player_user_callback(sender, instance, **kwargs):
	player, new = Player.objects.get_or_create(user=instance, points = 17)

post_save.connect(create_player_user_callback, User)


DEFAULT_SLUG_PATH= json.dumps([{"path":"m 14.418178,18.670806 0.776903,-7.927526 c 0.888962,-1.040316 1.100094,-1.5116709 1.100094,-2.0261743 0,-1.1615904 -1.076178,-2.1032456 -2.40371,-2.1032456 -1.327532,0 -2.403709,0.9416552 -2.403709,2.1032456 0,0.5634061 0.253175,1.0750715 0.968156,2.1113413 l 0.835231,8.162092","stroke-width":"1px","stroke":"#000000","type":"path","stroke-opacity":"1","stroke-linejoin":"round","stroke-linecap":"round","fill":"#ff0000"},{"path":"m 7.0067854,33.722973 c 3.8060486,-2.813434 2.7995275,-19.486331 7.6091676,-18.649809 4.898386,0.464927 5.120269,4.1456 8.162615,5.864605 4.373696,0.416274 20.358312,-0.563028 24.132105,-0.520576 4.622716,3.349768 7.554617,12.621997 9.914999,13.30578 -5.995696,1.08122 -17.319639,1.102361 -21.723445,-0.490285 -1.870825,-0.676588 -6.506725,-0.398945 -10.738444,0.441409 -5.10917,1.014604 -12.414993,0.695061 -17.3569976,0.04888 z","stroke-width":"1px","stroke":"#000000","type":"path","stroke-opacity":"1","stroke-linejoin":"round","stroke-linecap":"round","fill":"#ff0000"},{"path":"M 13.220974,19.701844 8.588506,13.059492 C 6.907079,12.877389 5.830902,11.935734 5.830902,10.774144 c 0,-1.1615908 1.076177,-2.103246 2.403709,-2.103246 1.327532,0 2.40371,0.9416552 2.40371,2.103246 0,0.293535 -0.06873,0.573026 -0.149284,1.329565 0.798625,1.605814 2.388517,4.035472 3.121831,5.418413 l 0.960037,1.824072","stroke-width":"1px","stroke":"#000000","type":"path","stroke-opacity":"1","stroke-linejoin":"round","stroke-linecap":"round","fill":"#ff0000"},{"path":"m 24.363783,33.674097 c 4.231719,-0.840354 8.783426,-0.809733 10.738444,-0.441409 4.207036,0.947465 17.058872,1.160945 20.537971,0.228399 3.252716,-0.480817 3.965387,2.458294 1.25535,2.701763 C 55.312156,36.305102 44.836799,37.547788 34.93208,35.514018 32.690455,35.053738 27.471465,35.01547 22.619371,36.06563 17.30908,37.214959 7.7444324,37.375086 6.0379882,36.270928 4.6187677,35.352618 5.6542583,33.969169 6.7264944,34.089172 12.152976,34.696495 19.254613,34.688701 24.363783,33.674097 z","stroke-width":"1px","stroke":"#000000","type":"path","stroke-opacity":"1","stroke-linejoin":"round","stroke-linecap":"round","fill":"#800000"},{"path":"m 9.8290287,29.209751 c 2.7386533,0.157451 3.0758263,0.527309 5.0923193,-0.783082 0.575395,-1.381154 0.53975,-1.454668 1.682009,-1.868921","stroke-width":"0.78651768px","stroke":"#000000","type":"path","stroke-opacity":"1","stroke-linejoin":"round","stroke-linecap":"round","fill":"none"}])

randomNames = lambda : [name.text for name in BeautifulSoup(urlopen('http://www.behindthename.com/api/random.php?key=sa071313&number=4').read()).findAll('name')]
