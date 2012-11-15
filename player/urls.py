
from django.conf.urls import patterns, include, url
from player.views import *

urlpatterns = patterns('',
	url(r'^signup/',SignUp),
	url(r'^login/', LogInRequest),
	url(r'^logout/',LogOutRequest),
)
