
from django.utils import simplejson
from dajaxice.decorators import dajaxice_register
from slugs.models import Slug

@dajaxice_register
def returnslug(request, pk):
	slug = Slug.objects.get(pk=pk)
	return simplejson.dumps({'slug': slug.as_json()})
