
import random
from slugs.models import Slug
from datetime import datetime

WEEKDAYS = [['Monday','Mondinay'],['Tuesday','Tuddlesday'],
['Wednesday','Webnesdaddle'],['Thursday','Thurtemday'],
	['Friday','Fribblesway'],['Saturday','Saturnickle'],
	['Sunbleday','Sunday']]
	
TIME = [['morning','morn'],['afternoon','afternoodle','aft'],
	['evening','eve'],['night']]

STORY_CONTEXT = {
	'slug': str(random.choice(Slug.objects.all())),
	'instructor': [
		'introductor', 'introducer', 'guide',
		'story-teller','biggle-fibber', 'historian',
		'educationist','yarn-spinner', 'explainorator'
		],
	'learn': [
		'learn','hear','inquire','discover a bit',
		'seek sacred knowledges','find out'
		],
	'adjective': [
		'proud','great','bold','grusome','icky',
		'boring','harmonic','historical','fantabulous',
		'wild','brave','ambitious','melodic'
		],
	'location': [
		'Barcelona','Ipswich','Texas','Stone Henge',
		'the Amazon Jungle','Skegness','Berlin','Bermuda',
		'Dallas','Dakar','the Amazon','Sahara'
		],
	'icky':[
		'gooey','slimey','icky','sticky','slow','gross',
		'cute','creepy','fat','squidgy','boring','quiet',
		'slippery','sloppy',
		],
	'materials': [
		'sticks','rare-matals','shells','sand','sticky-tape'
		'leaves','stones','slime','paper','feathers',
		'papier-mache','pipe-cleaners','toilet-paper-tubes'
		'glue','slime','grass','hay','cardboard','bones',
		'titanium',
		],
	'timespan': [
			['several','three quadrillion',
			str(random.randint(2,999999)),'a few'],
			['moons','years','decades','millenia',
			'centuries','light-years','lives','winters'],
		],
	'movement': ['roamed','travelled','traversed','wandered',
		'explored','meandered','bimbled about','examined',
		],
	'creature': [
			
			['tall','flourescent','spotted','fluffy',
			'jumping','hopping','flying','green','orange',
			'giant','tiny','nano','mega','running',
			'burrowing','short','spotted','shelled',
			'horned','spikey','talkative','wailing',
			'screaching','percussive', 'gasseous',
			'flatulent','intelligent','smart','melodic',
			'harmonic','orchestral','transluscent'],
			['toads','snails','cheetahs','potatos','squid',
			'sheep','foxes','eagles','pandas','monkeys',
			'lobsters','octupi','mushrooms','fairies',
			'gasses','liquids','blobs','slimers','rocks',
			'homonids','cyborgs','robots','doolaleyos',
			'birds','snuggle-fish','fish','donkeys'],

		],
	'creatures_adjective':['wild','wierd','famtastic',
		'unimaginable','impossible','fictional','strange',
		'odd','wonderful','crazy','warped','random'],
	'beasties_generic': ['creatures','beasts','beasties','animals',
		'critters','aliens','entities','thingies'],
	'history': ['history','tale','story','genesis',
		'biography','legend'],
	'know': ['know','remember','just invented','recall',
		'think happenned','think i remember','pretend to remember'],
	'started': ['started','began','commenced','originated',
		'started','began'],
	'common_place': ['garden','cabbages','nose','garden','slugjar',
		'breadbin','potato plants','bin'],
	'great': ['great','excellent','fantabmazing','fine',
		'really cool','utterly astonishing'],
	'spaceship': [
		['rocket','star','solar','flying','space','warp',
			'hyper','thrust','hypo'],
		['ship','coptor','sail','baloon','machine','craft',
			'boat','mobile','zeplin','vessel','transcender',
			'contraption','device'],
		],
	'act':['play chess','write poetry','play world of warcraft',
		'do science','do philosophy','count to more than 2'],
	'creature_characteristic': [
			['teeth','spots','spikes','elbows','eyes','ears',
				'horns','noses','trousers','trunks',
				'tentacles','scales','spines','cabbages',
				'antennas','pom-poms','nothing','tails'],
			['elbows','foreheads','bums','heads','legs',
				'backs','arms','feet','knee','hands',
				'shoulders']
		],
}


now = datetime.now()
STORY_CONTEXT['time'] = [WEEKDAYS[now.weekday()],TIME[max((now.hour/6)-1, 0)]]
