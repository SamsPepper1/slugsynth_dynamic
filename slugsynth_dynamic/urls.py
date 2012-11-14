from django.conf.urls import patterns, include, url
from home.views import home, newsong
#from django.contrib import admin
#admin.autodiscover()


urlpatterns = patterns('',
	url(r'^$', home),
	url(r'^newsong/$', newsong),
	#url(r'^poll/(\d+)/$', poll),
	#url(r'^admin/',include(admin.site.urls)),
)
