from django.shortcuts import render
from django.http import HttpResponse

# Home view (for address '/')
def home(request):
	context = {'title': 'Home'}
	return render(request, 'home.html', context)


def newsong(request):
	context = {'title': 'New Song'}
	return render(request, 'newsong.html', context)	
