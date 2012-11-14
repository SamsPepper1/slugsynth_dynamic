"""
This file demonstrates writing tests using the unittest module. These will pass
when you run "manage.py test".

Replace this with more appropriate tests for your application.
"""

from django.test import TestCase
from django.contrib.auth.models import User


from player.models import Player

class PlayerTests(TestCase):

	def test_player_object_exists_and_contains_user_as_User(self):
		# make a User Object
		u = User(first_name='John', last_name='Terry', username="BillBao")
		u.save()
		self.assertIn(u, User.objects.all())

		# make Player object around user
		p = Player(user=u)

		# Player should have following attributes:
		attributes = ['bio','slugs','songs','comments','votes']

		# check the object with 'hasattr' built-in function
		for a in attributes:
			self.assertEquals(hasattr(p,a), True)

		#check the Player saves correctly
		p.save()
		#check it has been correctly added
		self.assertIn(p, Player.objects.all())
	
		# ceck that Player.user is our user object
		self.assertEquals(p.user, u)

		#Check that Player.__unicode__ is its username
		self.assertEquals(p.__unicode__(), p.user.username)
