# Create your views here.
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response, get_object_or_404, render
from django.template import RequestContext
from player.forms import RegistrationForm, LoginForm, ImageForm,AboutForm
from player.models import Player
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from PIL import Image
from slugsynth_dynamic.settings import PLAYER_LIMIT


def SignUp(request):
	if request.user.is_authenticated():
		return HttpResponseRedirect('/user/myprofile/')
	if Player.objects.count() >= PLAYER_LIMIT:
		return HttpResponseRedirect('/limit_reached')
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
			player.points = 17
			player.save()
			player.getStarterPallette()
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
		return HttpResponseRedirect('/user/myprofile/')
	if request.method == 'POST':
		form = LoginForm(request.POST)
		if form.is_valid():
			username = form.cleaned_data['username']
			password = form.cleaned_data['password']
			user = authenticate(username=username, password=password)

			if user is not None:
				try:
					login(request, user)
				except:
					return HttpResponseRedirect('/user/login/')
				return HttpResponseRedirect('/user/myprofile/')
			else:
				return	render_to_response('login.html', {'form': form,'error':True, 'title': 'Log In'}, context_instance=RequestContext(request))
		else:
			return return_to_response('login.html', {'form': form,'error': True, 'title': 'Log In'}, context_instance=RequestContext(request))

	else:
		''' user is not submitting the form, show login form '''
		form = LoginForm()
		context = {'form': form}
		return render_to_response('login.html', context, context_instance=RequestContext(request))


def LogOutRequest(request):
	logout(request)
	return HttpResponseRedirect('/')



def Profile(request, player_id):
	player = Player.objects.get(pk=player_id)
	context = {'player': player}
	return render_to_response('profile.html',context, context_instance= RequestContext(request))

@login_required
def MyProfile(request):
	if not request.user.is_authenticated():
		return HttpResponseRedirect('/')
	player = request.user.get_profile()
	context = {'player': player, 'edit': True, 'imageForm': ImageForm, 'aboutForm': AboutForm}

	return render_to_response('profile.html', context,context_instance = RequestContext(request))




@login_required
def imageChange(request):
	if not request.user.is_authenticated() or not request.method == 'POST':
		return HttpResponseRedirect('/')
	player = request.user.get_profile()
	form = ImageForm(request.POST,request.FILES)
	if form.is_valid():
		image = form.cleaned_data['image']
		if image.size > 32000:
			return HttpResponseRedirect('/image_error')
		player.avatar = image
		player.save()
		return HttpResponseRedirect('/user/myprofile/')
	return HttpResponseRedirect('/user/myprofile/')




@login_required
def aboutChange(request):
	if not request.user.is_authenticated() or not request.method == 'POST':
		return HttpResponseRedirect('/')
	player = request.user.get_profile()
	form = AboutForm(request.POST)
	if form.is_valid():
		about = form.cleaned_data['about']	
		player.bio = about
		player.save()
		return HttpResponseRedirect('/user/myprofile/')
	return HttpResponseRedirect('/user/myprofile/')

