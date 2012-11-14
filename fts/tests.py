from collections import namedtuple
from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class HomePageTest(LiveServerTestCase):

	#set up test browser
	def setUp(self):
		self.browser = webdriver.Firefox()
		self.browser.implicitly_wait(3)


	# tear down test browser
	def tearDown(self):
		self.browser.quit()

	def test_home_view_has_correct_elements(self):
		# Barry opens web browser and goes to home page
		self.browser.get(self.live_server_url)

		# Barry sees header 'SlugJam'	
		main_header = self.browser.find_element_by_tag_name('h1')
		self.assertEquals('SlugJam', main_header)


