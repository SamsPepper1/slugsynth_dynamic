
from django import forms
from django.contrib.auth.models import User
from django.forms import ModelForm
from player.models import Player

class RegistrationForm(ModelForm):
	username	=	forms.CharField(label=(u'User Name'))
	email 		=	forms.EmailField(label=(u'Email Address'))
	password	=	forms.CharField(label=(u'Password'), widget=forms.PasswordInput(render_value=False))
	password1	=	forms.CharField(label=(u'Verify Password'), widget=forms.PasswordInput(render_value=False))
	bio		=	forms.CharField(label=(u'About Me'))

	class Meta:
		model = Player
		exclude = ('user','slugs','songs','comments','votes')
		
	def clean_username(self):
		username = self.cleaned_data['username']
		try:
			User.objects.get(username=username)
		except User.DoesNotExist:
			return username
		raise forms.ValidatoinError("That username is already taken, please select, another")

	def clean_password(self):
		password = self.cleaned_data['password']
		password1 = self.cleaned_data['password1']
		if password != password1:
			raise forms.ValidationError("The passwords did not match. Please try again.")
		return password
