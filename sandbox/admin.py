from django.contrib import admin
from django.contrib.auth.models import User, Group

from saturn.admin import site as saturn_admin
from .models import DummyUser, DummyProduct

# Register to Django Admin
admin.site.register([DummyUser, DummyProduct])

# Register to Saturn Admin
saturn_admin.register([User, Group, DummyUser, DummyProduct])
