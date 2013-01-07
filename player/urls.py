from django.conf.urls import patterns, include, url
from django.views.generic.simple import direct_to_template
from player.views import *
from django.views.generic import ListView

urlpatterns = patterns('',
	url(r'^signup/$',SignUp),
	url(r'^login/$', LogInRequest),
	url(r'^logout/$',LogOutRequest),
	url(r'^resetpassword/passwordsent/$','django.contrib.auth.views.password_reset_done'),
	url(r'^resetpassword/$','django.contrib.auth.views.password_reset'),
	url(r'^reset/(?P<uidb36>[0-9A-Za-z]+)-(?P<token>.+)/$','django.contrib.auth.views.password_reset_confirm'),
	url(r'^reset/done/$', 'django.contrib.auth.views.password_reset_complete'),
	url(r'^myprofile/$', MyProfile),
	url(r'^profile/(?P<player_id>[0-9]+)/$', Profile),
	url(r'^imageChange/',imageChange),
	url(r'^list/page(?P<page>[0-9]+)/$', ListView.as_view(
				queryset = Player.objects.order_by('-points'),
				context_object_name='player_list',
				paginate_by=3,
				template_name='player_list.html')),
)
