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
