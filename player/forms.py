
import floppyforms as forms
from django.contrib.auth.models import User
from django.forms import ModelForm
from player.models import Player


class PlaceholderInput(forms.TextInput):
	template_name= 'placeholder_input.html'

class PlaceholderTextArea(forms.Textarea):
	template_name='placeholder_textarea.html'

class PlaceholderPassword(forms.PasswordInput):
	template_name='placeholder_password.html'

class RegistrationForm(ModelForm):
	username	=	forms.CharField(label=(u'User Name'), widget=PlaceholderInput(
						attrs={'placeholder': u'choose a name'},))
	email 		=	forms.EmailField(label=(u'Email Address'), widget=PlaceholderInput(
						attrs={'placeholder': u'enter your email address'},))
	password	=	forms.CharField(label=(u'Password'), widget=PlaceholderPassword(render_value=False,
						attrs={'placeholder': u'enter a password'},))
	passwordB	=	forms.CharField(label=(u'Verify Password'), widget=PlaceholderPassword(render_value=False,
						attrs={'placeholder': u're-enter your password',}))
	bio		=	forms.CharField(label=(u'About Me'), widget=PlaceholderTextArea(
							attrs={'placeholder':'tell us something about yourself'},))

	class Meta:
		model = Player
		exclude = ('user','points', 'avatar')
		
	def clean_username(self):
		username = self.cleaned_data['username']
		try:
			User.objects.get(username=username)
		except User.DoesNotExist:
			return username
		raise forms.ValidationError("That username is already taken, please select, another")

	def clean(self):
		try:
			password = self.cleaned_data['password']
			passwordB = self.cleaned_data['passwordB']
		except KeyError:
			raise forms.ValidationError("you left a field blank..")
		if password != passwordB:
			raise forms.ValidationError("The passwords did not match. Please try again.")
		return self.cleaned_data


class LoginForm(forms.Form):
	username	=	forms.CharField(label=(u'User Name'),widget=PlaceholderInput(
							attrs={'placeholder': 'your username'},))
	password	=	forms.CharField(label=(u'Password'), widget=PlaceholderPassword(render_value=False, attrs={'placeholder': 'your password'},))

