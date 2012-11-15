from django.conf.urls import patterns, include, url
from django.views.generic.simple import direct_to_template
from player.views import *

urlpatterns = patterns('',
	url(r'^signup/',SignUp),
	url(r'^login/', LogInRequest),
	url(r'^logout/',LogOutRequest),
	url(r'^resetpassword/passwordsent/$','django.contrib.auth.views.password_reset_done'),
	url(r'^resetpassword/$','django.contrib.auth.views.password_reset'),
	url(r'^reset/(?P<uidb36>[0-9A-Za-z]+)-(?P<token>.+)/$','django.contrib.auth.views.password_reset_confirm'),
	url(r'^reset/done/$', 'django.contrib.auth.views.password_reset_complete'),
)
