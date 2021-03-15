from functools import update_wrapper

from django.contrib.admin import ModelAdmin
from django.http import JsonResponse

from .forms import UsernameForm


class SaturnAdminModel(ModelAdmin):
    """
    WIP: Django/React URL handlers
    """

    def get_urls(self):
        from django.urls import path

        def wrap(view):
            def wrapper(*args, **kwargs):
                return self.admin_site.admin_view(view)(*args, **kwargs)

            wrapper.model_admin = self
            return update_wrapper(wrapper, view)

        info = self.model._meta.app_label, self.model._meta.model_name

        return [
            path('', wrap(self.changelist_view), name='%s_%s_changelist' % info),
        ]

    def changelist_view(self, request, extra_context=None):
        queryset = self.get_queryset(request)
        return JsonResponse({"users": list(queryset.values())})

    def changeform_view(self, request, object_id=None, form_url='', extra_context=None):
        if request.method == 'POST':
            form = UsernameForm(request.POST)
            if form.is_valid():
                form.save(request.POST)
                context = form.cleaned_data
            else:
                context = form.errors

        elif request.method == 'GET':
            obj = self.get_object(request, object_id)
            context = {
                'id': obj.id,
                'name': obj.name
            }

        else:
            context = {'error': f'{request.method} Method not allowed'}

        return JsonResponse(context)
