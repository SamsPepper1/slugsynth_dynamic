from django.shortcuts import render
from django.http import HttpResponse
from home.storymaker import getRandomStoryWords

# Home view (for address '/')
def home(request):
	context = {'title': 'Home'}
	return render(request, 'home.html', context)



def testAjax(request):
	context = {}
	return render(request, 'testAjax.html', context)

def about(request):
	return render(request,'about.html')


def story(request):
	storyWords = getRandomStoryWords()
	return render(request, 'story.html', storyWords)


def donate(request):
	return render(request, 'donate.html')
