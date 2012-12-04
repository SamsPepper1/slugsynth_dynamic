from django.conf.urls import patterns, include, url
from song.views import newSong, loadSong
from django.views.generic import ListView
from song.models import Loop

urlpatterns = patterns('',
	url('^new/$', newSong),
	url('^load/(?P<songPK>[\d]+)/$', loadSong),
	url('^list/page(?P<page>[0-9]+)/$', ListView.as_view(
				queryset = Loop.public_posts.all(),
				context_object_name='song_list',
				paginate_by=5,
				template_name='song_list.html')),
)
