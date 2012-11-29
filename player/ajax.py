from django.utils import simplejson
from dajaxice.decorators import dajaxice_register
from slugs.models import Slug, Shape
from datetime import datetime


@dajaxice_register
def changeSlugName(request, originalname,newname, id):
	if request.user.is_authenticated():	
	
		player = request.user.get_profile()


		try:
			slug = player.slug_set.get(name=originalname)
		except Slug.DoesNotExist:
			return simplejson.dumps({'message':'Something has gone wrong. According to my records, %s does not own a slug names %s'%(player.user.username, originalname)})
		slug.name = newname
		slug.save();
		return simplejson.dumps({'message':'success','newName': newname, 'id': id})
	else:
		return simplejson.dumps({'message':'You do not seem to be logged in. I cannot permit this action. sorries.'})
		
