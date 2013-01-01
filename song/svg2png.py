import subprocess
from colorsys import hsv_to_rgb
import svgwrite
from song.models import Loop
from slugs.models import Shape
import os
from time import sleep
import simplejson
from django.core.files import File
import cairosvg

THUMB_PATH = 'media/songs/thumbnails/'

def raphaelPath2String(raphael_object):
	return " ".join([a[0] + ' ' + ','.join([str(e) for e in a[1:]]) for a in raphael_object['path']])

def toRGB(fillString):
	h,s,v = fillString.split('(')[1].split(')')[0].split(',')
	return 'rgb(' + ','.join([str(int(c*255)) for c in hsv_to_rgb(float(h),float(s),float(v))])+')'



def drawByName(name):
	try:
		loop = Loop.objects.get(name=name)
	except Loop.DoesNotExist:
		print 'song not sound'
		return
	drawSong(loop)


def drawSong(loop):

	svg = svgwrite.Drawing(filename="temp.svg", size=("200px", "100px"))
	#draw Grid
	cellMargin = 0.5
	cellWidth = 196.0/loop.length
	cellHeight = 76.0/SCALE_HEIGHTS[loop.scale]
	gridOffsetX = 2 
	gridOffsetY = 1.5
	for y in range(SCALE_HEIGHTS[loop.scale]):
		for x in range(loop.length):
			rect = svg.rect(insert = (gridOffsetX, gridOffsetY), size=(cellWidth-cellMargin, cellHeight-cellMargin), rx=2, ry=1, fill="rgb(63,124,34)")
			svg.add(rect)
			gridOffsetX += cellWidth
		gridOffsetX = 2
		gridOffsetY += cellHeight

	#draw Slugs/notes
	notes = simplejson.loads(loop.notes)
	for note in notes:
		shape = Shape.objects.get(pk=note['envpk'])
		x = 2+(note['pos']*cellWidth)
		y = -2+(note['note']*cellHeight)
		drawShape(shape, svg, scale=(0.5,0.33333), translate=(2*x,3*y))

	
	# draw pallette
	offset = 0
	for slug in loop.get_slugs():
		shape = slug.shapes.all()[0]
		drawShape(shape, svg, scale=(0.8,0.8), translate=(offset, 80))
		offset += 50*(1/0.8)

	#save and convert
	svg.save()
#	sleep(5)
#	subprocess.Popen(['inkscape','-f','temp.svg','-w','200','-h','100','-e','temp.png'])
#	sleep(5)
	svg = open('temp.svg').read()
	fout = open('temp.png','w')
	cairosvg.svg2png(bytestring=svg,write_to=fout)
	fout.close()
	os.remove('temp.svg')
	tags = ' '.join([tag.__unicode__() for tag in loop.get_tags()])
	loop.thumbnail.save(THUMB_PATH+loop.name +'.png', File(open('temp.png')))
	loop.save()
	loop.set_tags(tags)
	os.remove('temp.png')
		

def drawShape(shape,svg, scale=(1,1), translate=(0,0)):
	paths = simplejson.loads(shape.shape)
	color = toRGB("hsv("+str(1.0*shape.slug_set.all()[0].color/255)+',0.5,0.5)')
	for path in paths:
		st = raphaelPath2String(path)
		elem = svg.path(d=st, stroke_width='1', stroke='black', fill=color)
		elem.scale(scale[0],scale[1])
		elem.translate(translate[0], translate[1])
		svg.add(elem)


SCALE_HEIGHTS = {'Ma': 8, 'Mi': 8, 'mPent':11, 'MPent':11}

