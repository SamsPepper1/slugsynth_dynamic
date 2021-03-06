from django.utils import simplejson
from dajaxice.decorators import dajaxice_register
from slugs.models import Slug, Shape
from song.models import Loop
from home.helpers import tDate
from player.models import Player	
from django.core.exceptions import ObjectDoesNotExist
from song import tasks



@dajaxice_register
def saveSong(request,songString):
	if request.user.is_authenticated():
		player = request.user.get_profile()
		songObj = simplejson.loads(songString)
		
		song = Loop(creator = player,name=songObj['name'],tempo=songObj['tempo'],scale=songObj['scale'], length=songObj['length'], notes = simplejson.dumps(songObj['notes']),baseFreq = songObj['baseFreq'],last_used = tDate(),public=True,public_edit = True)
		try:
			if songObj['songPK']:
				song.parent = Loop.objects.get(pk=songObj['songPK'])
			song.save()
			song.addShapes()
			song.set_tags(songObj['tags'])
			player.points += 5
			player.save()
		except Loop.IntegrityError:
			return simplejson.dumps({'message':'error saving song'})
	#	song.save()
		tasks.drawSongTask.delay(song)
		return simplejson.dumps({'message':'saved song %s'% song.name}) 
		


@dajaxice_register
def loadSong(request, songPK):
	#return simplejson.dumps({'message': 'attempting to load song with pk %s'%songPK})
	try:
		song = Loop.public_posts.get(pk=songPK)
	except Loop.DoesNotExist:
		return simplejson.dumps({'message': 'cannot load song'})
	slugs = [slug.as_data() for slug in song.shapes.all()]
	return simplejson.dumps({'message': 'loaded song %s'%song.name, 'song': song.as_data()})


@dajaxice_register
def test(request):
	return simplejson.dumps([[1,2,3],[3,2,1],[2,3,4]])
