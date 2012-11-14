from django.contrib import admin
from polls.models import Poll, Choice

class ChoiceInLine(admin.StackedInline):
	model = Choice
	extra = 3

class PollAdmin(admin.ModelAdmin):
	inlines = [ChoiceInLine]

admin.site.register(Poll, PollAdmin)
