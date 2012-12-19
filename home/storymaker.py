
import random
from slugs.models import Slug
from datetime import datetime

WEEKDAYS = ['Mondinay','Tuddleesday','Webnesdaddle','Thurtemday','Fribblesway','Saturnickle','Sunbleday']
ADJECTIVES = ['proud','great','bold','grusome','icky','boring','harmonic','historical','fantabulous','wild','brave','ambitious','melodic']
LOCATIONS = ['Barcelona','Ipswich','Texas','Stone Henge','the Amazon Jungle','Skegness','Berlin']
ICKY = ['gooey','slimey','icky','sticky','slow','gross','cute','creepy','fat','squidgy','boring','quiet']
MATERIALS = ['sticks','rare-matals','shells','sand','leaves','stones','slime','paper','feathers','papier-mache','pipe-cleaners','toiet-paper-tubes']
NUMBER = ['several','three quadrillion',str(random.randint(2,999999)),'a few']
TIMEUNIT = ['moons','years','decades','millenia','centuries','light-years','frogs','winters']
MOVEMENT = ['roamed','travelled','traversed','wandered','explored','meandered','bimbled about']
CREATURES_ADJ = ['wild','wierd','famtastic','unimaginable','impossible','fictional','strange','odd','wonderful','crazy',]
CREATURE_PHYSICAL_ADJ = ['tall','flourescent','jumping','hopping','flying','green','orange','giant','tiny','nano','mega','running','burrowing','short','spotted','shelled','horned','spikey','talkative','wailing','screaching','percussive', 'gasseous','flatulent','intelligent','smart','melodic','harmonic','orchestral']
CREATURE = ['toads','snails','cheetahs','potatos','squid','sheep','foxes','eagles','pandas','monkeys','lobsters','octupi','mushrooms','fairies','gasses','liquids','blobs','slimers','rocks','homonids','cyborgs','robots','doolaleyos','birds','snuggle-fish','fish','donkeys']


CREATURES_GENERAL = ['creatures','beasts','beasties','animals','critters','aliens','entities']




adj_and_adj = lambda choices: random.choice(choices) + ' and ' + random.choice(choices)
timespan = lambda : random.choice(NUMBER) + ' ' + random.choice(TIMEUNIT)
new_creature = lambda : random.choice(CREATURE_PHYSICAL_ADJ) + ' ' + random.choice(CREATURE)

def getRandomStoryWords():
	info = {}
	info['slug'] = random.choice(Slug.objects.all())
	info['instructor'] = random.choice(['introductor', 'introducer', 'guide','story-teller','biggle-fibber', 'historian','educationist','yarn-spinner', 'explainorator'])
	now = datetime.now()
	if random.random() > 0.4:
		if 6 <= now.hour < 12 :
			info['time'] = 'morning'
		elif now.hour < 17 :
			info['time'] = random.choice(['afternoon','afternoodle','PM'])
		elif now.hour < 24:
			info['time'] = 'evening'
		else:
			info['time'] = 'night'
	else:
		info['time'] = WEEKDAYS[now.weekday()]
	info['learn'] = random.choice(['learn','hear','inquire','discover a bit','seek sacred knowledges'])
	info['adjective1'] = random.choice(ADJECTIVES)
	info['historysyn'] = random.choice(['history','tale','story','genesis','collective-autobiography'])
	info['adjective2'] = random.choice(ADJECTIVES)
	info['know'] = random.choice(['know','remember','just invented','recall','think happenned'])
	info['started'] = random.choice(['started','began','commenced','originated','started','began'])
	info['timespan1'] = timespan()
	info['place'] = random.choice(LOCATIONS)
	info['commonSlugPlace'] = random.choice(['garden','cabbages','nose','garden','slugjar','bradbin','potato plants','bin'])
	info['icky1'] = random.choice(ICKY)
	info['icky2'] = random.choice(ICKY)
	info['great'] = random.choice(['great','excellent','fantabmazing','fine','really cool'])
	info['timespan2'] = timespan()
	info['intelligent_act'] = random.choice(['write poetry','play ' + random.choice(['chess','tennis','world of warcraft']),'do science'])
	info['spaceship'] = "-".join([random.choice(['rocket','star','solar','flying','space','warp','hyper']),random.choice(['ship','coptor','sail','baloon','machine','craft','boat','mobile'])])
	info['materials'] = random.choice(MATERIALS) + ' and '+ random.choice(MATERIALS)
	info['timespan3'] = timespan()
	info['movement'] = random.choice(MOVEMENT)
	info['creatures_adjectives'] = adj_and_adj(CREATURES_ADJ)
	info['creatures_general'] = random.choice(CREATURES_GENERAL)
	info['creature_1'] = new_creature()
	info['creature_2'] = new_creature()
	return info
	
