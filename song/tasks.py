from celery import task
from song import svg2png

@task
def drawSongTask(song):
	svg2png.drawSong(song)

