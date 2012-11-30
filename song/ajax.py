from django.utils import simplejson
from dajaxice.decorators import dajaxice_register
from slugs.models import Slug, Shape
from song.models import Loop
from datetime import datetime
from player.models import Player	



@dajaxice_register
def saveSong(request,songString):
	if request.user.is_authenticated():
		player = request.user.get_profile()
		songObj = simplejson.loads(songString)
		song = Loop(creator = player,name=songObj['name'],tempo=songObj['tempo'],scale=songObj['scale'], length=songObj['length'], notes = simplejson.dumps(songObj['notes']),last_used = datetime.now())
		try:
			song.save()
		except Loop.IntegrityError:
			return simplejson.dumps({'name':'error saving song'})
	#	song.save()
		return simplejson.dumps({'name':str(songObj)}) 
		
