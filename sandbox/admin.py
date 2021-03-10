from django.contrib import admin
from django.contrib.auth.models import User, Group

from saturn.admin import saturn_admin_site
from saturn.options import SaturnAdminModel
from .models import DummyUser

# Register to Django Admin
admin.site.register(DummyUser)


# Register to Saturn Admin
@admin.register(DummyUser, User, Group, site=saturn_admin_site)
class UserAdmin(SaturnAdminModel):
    pass
