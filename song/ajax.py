from django.utils import simplejson
from dajaxice.decorators import dajaxice_register
from slugs.models import Slug, Shape
from song.models import Loop
from datetime import datetime
from player.models import Player	
from django.core.exceptions import ObjectDoesNotExist



@dajaxice_register
def saveSong(request,songString):
	if request.user.is_authenticated():
		player = request.user.get_profile()
		songObj = simplejson.loads(songString)
		song = Loop(creator = player,name=songObj['name'],tempo=songObj['tempo'],scale=songObj['scale'], length=songObj['length'], notes = simplejson.dumps(songObj['notes']),last_used = datetime.now(),public=True,public_edit = True)
		try:
			song.save()
			song.set_tags(songObj['tags'])
		except Loop.IntegrityError:
			return simplejson.dumps({'message':'error saving song'})
	#	song.save()
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


#@dajaxice_register
