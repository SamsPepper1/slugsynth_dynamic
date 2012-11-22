
from django.utils import simplejson
from dajaxice.decorators import dajaxice_register
from slugs.models import Slug

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
