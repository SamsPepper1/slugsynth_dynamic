from django.shortcuts import render
from django.http import HttpResponse
from song.models import Loop 




def newSong(request):
	context = {'title': 'New Song',}
	return render(request, 'newsong.html', context)	

def loadSong(request,songPK):
	song = Loop.objects.get(pk=songPK)
	context = {'songPK': songPK}
	if request.user.is_authenticated():
		player = request.user.get_profile()
		if song.creator == player:
			context['mySong'] = True
		else:
			context['mySong'] = False
	else:
		context['mySong'] = False
	context['title']= 'Loading Song...'
	return render(request, 'loadsong.html', context)	

  
