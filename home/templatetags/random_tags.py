from django import template
import random

register = template.Library()

def random_word(choices, number=1):
	"""returns a random choice from the list"""
	return ' and '.join([random.choice(choices) for n in range(number)])

def random_word_complex(choices, joiner=' '):
	"""Returns string of one random word from
	each list in a list of lists."""
	st = joiner.join([random.choice(l) for l in choices])
	return st

register.filter('rw',random_word)
register.filter('rwc',random_word_complex)
