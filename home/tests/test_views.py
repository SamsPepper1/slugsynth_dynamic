from django.test import TestCase
from django.core.urlresolvers unoirt reverse


class HomePageViewTest(TestCase):
	
	def test_root_url_shows_static_links(self):
		# list of links
		links = [
				('Sign Up', '/signup/'),
				('Log In', '/login/'),
				('New Song','/newsong/')
			]

		response = self.client.get('/')

		# cycle through links, checking they exist and point to the correct url
		for text, address in links:
			link = response.content.find_ele
