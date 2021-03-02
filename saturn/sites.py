import json

from django.contrib.admin import AdminSite
from django.core.serializers.json import DjangoJSONEncoder
from django.shortcuts import render
from django.views.decorators.cache import never_cache


class SaturnAdminSite(AdminSite):
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
