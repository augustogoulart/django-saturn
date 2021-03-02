from django.contrib import admin
from django.contrib.auth.models import User, Group

from .models import DummyUser
from .sites import SaturnAdminSite
from .options import SaturnAdminModel

# Register to Django Admin
admin.site.register(DummyUser)


# Register to SaturnAdmin
saturn_admin_site = SaturnAdminSite(name="saturn")


@admin.register(DummyUser, User, Group, site=saturn_admin_site)
class UserAdmin(SaturnAdminModel):
    pass
