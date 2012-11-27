
from django.utils import simplejson
from dajaxice.decorators import dajaxice_register
from slugs.models import Slug, Shape
from datetime import datetime


@dajaxice_register
def returnslug(request, pk):
	slug = Slug.objects.get(pk=pk)
	return simplejson.dumps({'slug': slug.as_json()})

@dajaxice_register
def getDefaultPallette(request):
	if request.user.is_authenticated():
		player = request.user.get_profile()
		slugs = [s.as_data() for s in player.slug_set.all()]
		return simplejson.dumps({'message': "%s's slugs"%(player.user.username),'player': player.__unicode__(),'slugs':slugs})
	else:
		return simplejson.dumps({'message': 'None', 'slug': None})


@dajaxice_register
def saveShape(request, slugName, env):
	if request.user.is_authenticated():
		player = request.user.get_profile()
		try:
			slug = player.slug_set.get(name=slugName)
			env = simplejson.loads(env)
			shape = Shape(name="none", 
				last_used=datetime.now(), 
				shape = simplejson.dumps(env['shape']), 
				attack = env['A'],
				decay = env['D'],
				sustainLevel = env['S'],
				release = env['R'],
				sustainLengthDefault=env['duration'])
			shape.save()
			slug.shapes.add(shape)
			#return simplejson.dumps({'message':'slug named %s, owned by %s, has been found. shape has been saved.'%(slug, player)})
			return simplejson.dumps({'message': str(env['shape'])})
		except Slug.DoesNotExist:
			return simplejson.dumps({'message':'no slug names %s found for user %s'%(slugName, player)})
	else:
		return simplejson.dumps({'message':'you must be logged in to save a slug.'})