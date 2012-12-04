from django.shortcuts import render
from django.http import HttpResponse




def newSong(request):
	context = {'title': 'New Song'}
	return render(request, 'newsong.html', context)	

def loadSong(request,songPK):
	context = {'title': 'New Song', 'songPK': songPK}
	return render(request, 'loadsong.html', context)	

  
