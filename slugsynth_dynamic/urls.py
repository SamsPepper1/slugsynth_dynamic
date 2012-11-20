from django.conf.urls import patterns, include, url
from home.views import home, newsong, testAjax, about
from django.contrib import admin
from dajaxice.core import dajaxice_autodiscover 
dajaxice_autodiscover()
admin.autodiscover()


urlpatterns = patterns('',
	url(r'^$', home),
	url(r'^about/$', about),
	url(r'^testajax$',testAjax),
	url(r'^newsong/$', newsong),
	#url(r'^poll/(\d+)/$', poll),
	url(r'^user/', include('player.urls')),
	url(r'^admin/',include(admin.site.urls)),
	url(r'^dajaxice/', include('dajaxice.urls')),
)
