from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from song.models import Loop 
from django.template import RequestContext
from rating.models import Rating
from django.views.generic import ListView



def newSong(request):
	context = {'title': 'New Song',}
	return render(request, 'newsong.html', context)	

def loadSong(request,songPK):
	song = Loop.objects.get(pk=songPK)
	context = {'songPK': songPK, 'song': song}
	if request.user.is_authenticated():
		player = request.user.get_profile()
		if song.creator == player:
			context['mySong'] = True
		else:
			context['mySong'] = False
			if player in song.already_rated():
				context['alreadyRated'] = True
				context['myRating'] = song.rating_set.get(player=player).points
			else:
				context['alreadyRated'] = False
	else:
		context['mySong'] = False
	context['title']= 'Loading Song...'
	return render(request, 'loadsong.html', context)	

def rateSong(request, songPK):
	if request.method=='POST':
		if request.user.is_authenticated():
			song = Loop.objects.get(pk=songPK)
			points = request.POST['rating']
			r = Rating(model='song', points=int(points), song = song, player = request.user.get_profile(), comment='')
			r.save()
			return HttpResponseRedirect('/song/list/page1')
	else:
		return HttpResponseRedirect('/')


class songList(ListView):
	model = Loop
	template_name = 'song_list.html'
	context_object_name = 'song_list'
	paginate_by = 5
