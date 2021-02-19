from django.contrib.admin import AdminSite
from django.http import JsonResponse
from django.views.decorators.cache import never_cache

from saturn.core.models import DummyUser


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

        return JsonResponse(context)


saturn_admin_site = SaturnAdmin(name="saturn")
saturn_admin_site.register(DummyUser)
