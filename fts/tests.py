from collections import namedtuple
from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from django.conf import settings
from django.contrib.auth.models import User
from player.models import Player

class CreateUserTest(LiveServerTestCase):

	#set up test browser
	def setUp(self):
		self.browser = webdriver.Firefox()
		print 'setting up web browser'
		self.browser.implicitly_wait(3)


	# tear down test browser
	def tearDown(self):
		self.browser.quit()

	def DONTtest_home_view_has_correct_elements(self):
		# Barry opens web browser and goes to home page
		print 'connecting to %s'% self.live_server_url
		self.browser.get(self.live_server_url)

		# Barry sees header 'SlugJam'	
		main_header = self.browser.find_element_by_tag_name('h1')
		self.assertEquals('SlugJam', main_header.text)

		# check title is correct
		title = self.browser.find_element_by_tag_name('title')
		self.assertEquals('SlugJam | Home', title.text)
	
		# list of links
		links = [
				('Sign Up', '/user/signup/'),
				('Log In', '/user/login/'),
				('New Song','/newsong/'),
				('About','/about/'),
			]

		response = self.client.get('/')

		# cycle through links, checking they exist and point to the correct url
		for text, address in links:

			# it should link to live_server_url+address
			link = self.browser.find_element_by_link_text(text)

			self.assertEquals(self.live_server_url+address, link.get_attribute('href'))


	def test_go_to_sign_up_page_and_create_new_user(self):
		
		# count how many users and players there are already
		user_count = len(User.objects.all())
		player_count = len(Player.objects.all())
		
		# go to home page
		self.browser.get(self.live_server_url)

		# click on 'Sign Up' link
		link = self.browser.find_element_by_link_text('Sign Up')
		link.click()

		# see form with inputs for username, password, and email adress
		username_field = self.browser.find_element_by_name('username')
		email_field = self.browser.find_element_by_name('email')
		password_field = self.browser.find_element_by_name('password')
		passwordB_field = self.browser.find_element_by_name('passwordB')
		bio_field = self.browser.find_element_by_name('bio')			

		#fill in password, and email, ignore username
		username_field.send_keys('')
		email_field.send_keys('alice@example.com')
		password_field.send_keys('1234')
		passwordB_field.send_keys('1234')
		bio_field.send_keys('I was born in a stable on christmas day')

		# click submit
		submit = self.browser.find_element_by_css_selector("input[type='submit']")
		submit.click()	

		#should be sent back error form
		body = self.browser.find_element_by_tag_name('body')
		self.assertIn("error", body.text)

		# previous inputs should still be there
		

		
		#fill in form correctly
		username_field = self.browser.find_element_by_name('username')
		username_field.send_keys('alice')

		# click submit
		submit = self.browser.find_element_by_css_selector("input[type='submit']")
		submit.click()	

		# new page should be alice's profile
		title = self.browser.find_element_by_tag_name('title')
		self.assertEquals("SlugJam | alice's Profile", title.text)
		
		# Check that User and Player numbers have increased by one
		self.assertEquals(len(Player.objects.all()), player_count +1)
		self.assertEquals(len(User.objects.all()), User_count +1)


		
		# should see inputs for username and password

		#should fill them in correctly

		# should press submit, and be redirected to new Song Page


	def DONTtest_newSong_view_contains_correct_elements(self):
		# connect to live_server_url+'/newsong/'
		self.browser.get(self.live_server_url+'/newsong/')

		#New Song page should have title 'SLugJam | New Song'
		title = self.browser.find_element_by_tag_name('title')
		self.assertEquals('SlugJam | New Song', title.text)

		# test all script files are included
		js_list = [
				'js/raphael-min.js',
				'js/newWave.js',
				'images/slugpaths.js',
				'js/slugsynth.js',
				'js/catmullRom2Bezier.js',
			]
				
		# get list of script elements from the document
		scripts = self.browser.find_elements_by_tag_name('script')
		script_srcs = [s.get_attribute('src') for s in scripts]

		# check that each js is in script_srcs
		for js in js_list:
			self.assertIn(self.live_server_url+settings.STATIC_URL+js, script_srcs)


	

