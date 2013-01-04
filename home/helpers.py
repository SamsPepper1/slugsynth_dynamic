from django.utils.timezone import utc
from datetime import datetime

tDate = lambda : datetime.utcnow().replace(tzinfo=utc)
