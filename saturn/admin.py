import json

from django.contrib import admin
from django.contrib.admin import AdminSite, ModelAdmin
from django.contrib.auth.models import User, Group
from django.core.serializers.json import DjangoJSONEncoder
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.cache import never_cache

from .models import DummyUser

admin.site.register(DummyUser)


class SaturnAdmin(AdminSite):
    site_header = "Site Administration"
    site_title = "Saturn Admin"

    @never_cache
    def index(self, request, extra_context=None):
        app_list = self.get_app_list(request)
        context = {
            **self.each_context(request),
            'title': self.index_title,
            'app_list': app_list,
            **(extra_context or {}),
        }

        react_context = json.dumps(context, cls=DjangoJSONEncoder)

        return render(request, 'saturn/index.html', {'context': react_context})


saturn_admin_site = SaturnAdmin(name="saturn")


@admin.register(DummyUser, User, Group, site=saturn_admin_site)
class UserAdmin(ModelAdmin):

    def changelist_view(self, request, extra_context=None):
        queryset = self.get_queryset(request)
        return JsonResponse({"users": list(queryset.values())})

    def _changeform_view(self, request, object_id, form_url, extra_context):
        obj = self.get_object(request, object_id)
        return JsonResponse({'id': obj.id, 'name': obj.name})
