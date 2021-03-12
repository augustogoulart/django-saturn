from django.contrib import admin
from django.contrib.auth.models import User, Group

from saturn.admin import site as saturn_admin
from saturn.options import SaturnAdminModel
from .models import DummyUser

# Register to Django Admin
admin.site.register(DummyUser)


# Register to Saturn Admin
saturn_admin.register(DummyUser)
saturn_admin.register(User)
saturn_admin.register(Group)

