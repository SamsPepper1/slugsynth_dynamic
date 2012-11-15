# Create your views here.
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from player.forms import RegistrationForm
from django.contrib.auth.models import User

def SignUp(request):
	if request.user.is_authenticated():
		return HttpResponseRedirect('/profile/')
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
			return HttpResponseRedirect('/user/profile/')
		else:
			return render_to_response('register.html', {'form': form},
							context_instance=RequestContext(request))
	else:
		''' user is not submitting form, show them a blank form'''
		form = RegistrationForm()
		context = {'form': form}
		return render_to_response('register.html', context, context_instance=RequestContext(request))
