import random
import json
from datetime import datetime
from urllib2 import urlopen, URLError
from BeautifulSoup import BeautifulSoup


def makeStarterPallette(player):
	from slugs.models import Shape, Slug, Sound
	
	names = randomNames()
	shape1 = Shape(attack=0.06, decay= 0.08, sustainLevel=0.71, sustainLengthDefault=17180, release=0.1,shape=DEFAULT_SLUG_PATH, name='shape', last_used = datetime.now(), octave=4, favorite=True)
	shape1.save()
	slug1 = Slug(owner = player, name=names[0], birthday = datetime.now(), color = random.randint(0,255))
	slug1.save()
	sound1 = Sound(waveForm = 'sine', amp=0.2, overTones = "[[1,1]]", noise=0,slug=slug1)
	sound1.save()
	slug1.shapes.add(shape1)
	slug1.save()
	shape2 = Shape(attack=0.06, decay= 0.08, sustainLevel=0.71, sustainLengthDefault=17180, release=0.1,shape=DEFAULT_SLUG_PATH, name='shape', last_used = datetime.now(), octave= 4, favorite=True)
	shape2.save()
	slug2 = Slug(owner = player, name=names[1], birthday = datetime.now(), color = random.randint(0,180))
	slug2.save()
	sound2 = Sound(waveForm = 'square', amp=0.15, overTones = "[[1,1]]", noise=0,slug=slug2)
	sound2.save()
	slug2.shapes.add(shape2)
	slug2.save()
	
	shape3 = Shape(attack=0.06, decay= 0.08, sustainLevel=0.71, sustainLengthDefault=17180, release=0.1,shape=DEFAULT_SLUG_PATH, name='shape', last_used = datetime.now(), octave=4, favorite=True)
	shape3.save()
	slug3 = Slug(owner = player, name=names[2], birthday = datetime.now(), color = random.randint(0,180))
	slug3.save()
	sound3 = Sound(waveForm = 'sine', amp=0.2, overTones = randomOvertones(0.05,4,3), noise=0,slug=slug3)
	sound3.save()
	slug3.shapes.add(shape3)
	slug3.save()

	shape4 = Shape(attack=0.06, decay= 0.08, sustainLevel=0.71, sustainLengthDefault=17180, release=0.1,shape=DEFAULT_SLUG_PATH, name='shape', last_used = datetime.now(), octave=3, favorite=True)
	shape4.save()
	slug4 = Slug(owner = player, name=names[3], birthday = datetime.now(), color = random.randint(0,180))
	slug4.save()
	sound4 = Sound(waveForm = 'sine', amp=0.15, overTones = randomOvertones(0.4,0.5,3), noise=0,slug=slug4)
	sound4.save()
	slug4.shapes.add(shape4)
	slug4.save()





def randomOvertones(randA,randB,n):
	overtones = "[[1,1]"
	for n in range(random.randint(2,n)):
		rand = random.randint(1,12)
		overtones += ",[%s,%s]"%(str(rand + ((random.random()-0.5)*randA))[:5], str(rand+ (randB*(random.random()-0.5)))[:5])
	overtones += ']'
	return overtones

DEFAULT_SLUG_PATH= json.dumps([{"cursor": "pointer", "path": [["M", 14.418178, 18.670806], ["L", 15.195081, 10.743279999999999], ["C", 16.084043, 9.702963999999998, 16.295175, 9.231609099999998, 16.295175, 8.717105699999998], ["C", 16.295175, 7.555515299999998, 15.218997, 6.6138600999999975, 13.891465, 6.6138600999999975], ["C", 12.563933, 6.6138600999999975, 11.487756000000001, 7.555515299999998, 11.487756000000001, 8.717105699999998], ["C", 11.487756000000001, 9.280511799999998, 11.740931000000002, 9.792177199999998, 12.455912000000001, 10.828446999999997], ["L", 13.291143000000002, 18.990539]], "stroke": "#222", "stroke-width": 5, "fill": "hsb(0.45098039215686275,0.5,0.5)"}, {"cursor": "pointer", "path": [["M", 7.0067854, 33.722973], ["C", 10.812834, 30.909539000000002, 9.8063129, 14.236642000000003, 14.615953000000001, 15.073164000000002], ["C", 19.514339, 15.538091000000001, 19.736222, 19.218764, 22.778568, 20.937769000000003], ["C", 34.845, 20.417, 43.136880000000005, 20.417, 46.910673, 20.417193000000005], ["C", 51.533389, 27.07, 54.46529, 33.039190000000005, 56.825672000000004, 33.722973], ["C", 50.829976, 34.804193000000005, 39.506033, 34.825334000000005, 35.102227, 33.232688], ["C", 33.231402, 32.5561, 28.595502, 32.833743000000005, 24.363782999999998, 33.674097], ["C", 19.254613, 34.688701, 11.948789999999997, 34.369158000000006, 7.006785399999998, 33.722977], ["Z"]], "stroke": "#222", "stroke-width": 5, "fill": "hsb(0.45098039215686275,0.5,0.5)"}, {"cursor": "pointer", "path": [["M", 13.220974, 19.701844], ["L", 8.588506, 13.059492], ["C", 6.907079, 12.877389, 5.830902, 11.935734, 5.830902, 10.774144], ["C", 5.830902, 9.6125532, 6.9070789999999995, 8.670898, 8.234611000000001, 8.670898], ["C", 9.562143, 8.670898, 10.638321000000001, 9.612553199999999, 10.638321000000001, 10.774144], ["C", 10.638321000000001, 11.067679, 10.569591, 11.34717, 10.489037000000001, 12.103709],  ["L", 14.570905000000002, 19.346194]], "stroke": "#222", "stroke-width": 5, "fill": "hsb(0.45098039215686275,0.5,0.5)"}, {"cursor": "pointer", "path": [["M", 24.363783, 33.674097], ["C", 28.595502000000003, 32.833743000000005, 33.147209000000004, 32.864364, 35.102227, 33.232688], ["C", 39.309263, 34.180153000000004, 52.161099, 34.393633, 55.640198, 33.461087000000006], ["C", 58.892914, 32.980270000000004, 59.605585, 35.91938100000001, 56.895548, 36.162850000000006], ["C", 55.312156, 36.305102, 44.836799, 37.547788, 34.93208, 35.514018], ["C", 32.690455, 35.053738, 27.471465, 35.01547, 22.619371, 36.06563], ["C", 17.30908, 37.214959, 7.7444324, 37.375086, 6.0379882, 36.270928], ["C", 4.6187677, 35.352618, 5.6542583, 33.969169, 6.7264944, 34.089172], ["C", 12.152976, 34.696495, 19.254613, 34.688701, 24.363783, 33.674097], ["Z"]], "stroke": "#222", "stroke-width": 5, "fill": "hsb(0.45098039215686275,0.5,0.5)"}, {"cursor": "pointer", "path": [["M", 9.8290287, 29.209751], ["C", 12.567682000000001, 29.367202, 12.904855000000001, 29.73706, 14.921348, 28.426669], ["C", 15.496743, 27.045515, 15.461098, 26.972001, 16.603357, 26.557748]], "stroke": "#222", "stroke-width": 5, "fill": "hsb(0.45098039215686275,0.5,0.5)"}])

def randomNames():
	from slugs.models import Slug
	try:
		return [name.text for name in BeautifulSoup(urlopen('http://www.behindthename.com/api/random.php?key=sa071313&number=4', timeout=3).read()).findAll('name')]
	except URLError:
		names = []
		for n in range(0,4):
			r = random.randint(0,len(Slug.objects.all()))
			names.append(Slug.objects.get(pk=r).name)
		return names
			
