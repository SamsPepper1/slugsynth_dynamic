from django.conf.urls import patterns, include, url
from home.views import home, testAjax, about, story,donate, limit_reached,image_error
from django.conf import settings
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from dajaxice.core import dajaxice_autodiscover, dajaxice_config
import settings 
dajaxice_autodiscover()
admin.autodiscover()


urlpatterns = patterns('',
	url(r'^$', home),
	url(r'^about/$', about),
	url(r'^story/chapter(?P<chapter>[1-2]+)/$',story),
	url(r'^donate/$',donate),
	url(r'^testajax$',testAjax),
	url(r'^limit_reached$',limit_reached),
	url(r'^image_error$',image_error),
	url(r'^song/', include('song.urls')),
	#url(r'^poll/(\d+)/$', poll),
	url(r'^user/', include('player.urls')),
	url(r'^admin/',include(admin.site.urls)),
	url(r'^%s/' % settings.DAJAXICE_MEDIA_PREFIX, include('dajaxice.urls')),
	url(r'^media/(?P<path>.*)$', 'django.views.static.serve',{'document_root': settings.MEDIA_ROOT, 'show_indexes':True}),
)
