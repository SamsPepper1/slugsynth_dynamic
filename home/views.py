from django.shortcuts import render
from django.http import HttpResponse


# Home view (for address '/')
def home(request):
	context = {'title': 'Home'}
	return render(request, 'home.html', context)



def testAjax(request):
	context = {}
	return render(request, 'testAjax.html', context)

def about(request):
	return render(request,'about.html')


def story(request, chapter):
	from home.storymaker import STORY_CONTEXT
	context = STORY_CONTEXT
	context['nextpage'] = '/story/chapter'+str(int(chapter)+1)
	template = 'story'+chapter+'.html'
	return render(request, template, context)

def donate(request):
	return render(request, 'donate.html')


def limit_reached(request):
	return render(request, 'limit_reached.html')


def image_error(request):
	return render(request, 'image_error.html')


def tutorial(request, page):
	page = int(page)
	template = 'tutorial_page_%s.html'%(page)
	context = {}
	if page > 1:
		context['previous'] = '/tutorial/page%s/'% (page-1)
	else:
		context['previous'] = False
	if page < 2:
		context['next'] = '/tutorial/page%s/'% (page+1)
	return render(request, template, context)
	
		
