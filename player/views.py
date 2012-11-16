# Create your views here.
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from player.forms import RegistrationForm, LoginForm
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required


def SignUp(request):
	if request.user.is_authenticated():
		return HttpResponseRedirect('/user/profile/')
	if request.method == 'POST':
		form = RegistrationForm(request.POST)
		if form.is_valid():
			user = User.objects.create_user(
				username=form.cleaned_data['username'],
				password=form.cleaned_data['password'],
				email=form.cleaned_data['email']
			)
			user.save()
			player = user.get_profile()
			player.bio = form.cleaned_data['bio']
			player.save()
			return HttpResponseRedirect('/user/login/')
		else:
			return render_to_response('register.html', {'form': form},
							context_instance=RequestContext(request))
	else:
		''' user is not submitting form, show them a blank form'''
		form = RegistrationForm()
		context = {'form': form}
		return render_to_response('register.html', context, context_instance=RequestContext(request))


def LogInRequest(request):
	if request.user.is_authenticated():
		return HttpResponseRedirect('/user/profile/')
	if request.method == 'POST':
		form = LoginForm(request.POST)
		if form.is_valid():
			username = form.cleaned_data['username']
			password = form.cleaned_data['password']
			player = authenticate(username=username, password=password)	
			if player is not None:
				login(request, player)
				return HttpResponseRedirect('/user/profile/')
			else:
				return	return_to_response('login.html', {'form': form, 'title': 'Log In'}, context_instance=RequestContext(request))
		else:
			return return_to_response('login.html', {'form': form, 'title': 'Log In'}, context_instance=RequestContext(request))

	else:
		''' user is not submitting the form, show login form '''
		form = LoginForm()
		context = {'form': form}
		return render_to_response('login.html', context, context_instance=RequestContext(request))


def LogOutRequest(request):
	logout(request)
	return HttpResponseRedirect('/')

@login_required
def Profile(request):
	if not request.user.is_authenticated():
		return HttpResponseRedirect('/')
	player = request.user.get_profile();
	context = {'player': player}
	return render_to_response('profile.html', context, context_instance=RequestContext(request))
