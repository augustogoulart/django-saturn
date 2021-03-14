from functools import update_wrapper

from django.contrib.admin import ModelAdmin
from django.http import JsonResponse
from django.urls import re_path
from django.views.generic import RedirectView

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
            re_path(r'^(?:.*)/?$', wrap(self.changelist_view), name='%s_%s_changelist' % info),
            # path('add/', wrap(self.add_view), name='%s_%s_add' % info),
            # path('autocomplete/', wrap(self.autocomplete_view), name='%s_%s_autocomplete' % info),
            # path('<path:object_id>/history/', wrap(self.history_view), name='%s_%s_history' % info),
            # path('<path:object_id>/delete/', wrap(self.delete_view), name='%s_%s_delete' % info),
            # path('<path:object_id>/change/', wrap(self.change_view), name='%s_%s_change' % info),
            # # For backwards compatibility (was the change url before 1.9)
            # path('<path:object_id>/', wrap(RedirectView.as_view(
            #     pattern_name='%s:%s_%s_change' % ((self.admin_site.name,) + info)
            # ))),
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
