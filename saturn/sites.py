import json
from functools import update_wrapper

from django.contrib.admin import AdminSite
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models.base import ModelBase
from django.shortcuts import render
from django.urls import re_path, path, include
from django.views.decorators.cache import never_cache

from saturn.options import SaturnAdminModel


class SaturnAdminSite(AdminSite):
    site_header = "Site Administration"
    site_title = "Saturn Admin"

    def __init__(self, name='saturn_admin'):
        super().__init__(name)

    def register(self, model_or_iterable, admin_class=None, **options):
        """
        Register the given model(s) with the given admin class.

        The model(s) should be Model classes, not instances.

        If an admin_class isn't given, use SaturnAdminModel

        TODO - If keyword arguments are given -- e.g., list_display -- apply them as options to the admin class.

        TODO - If a model is already registered, raise AlreadyRegistered

        TODO - If a model is abstract, raise ImproperlyConfigured.
        """
        admin_class = admin_class or SaturnAdminModel
        if isinstance(model_or_iterable, ModelBase):
            model_or_iterable = [model_or_iterable]
        for model in model_or_iterable:
            self._registry[model] = admin_class(model, self)

    @never_cache
    def index(self, request, extra_context=None):
        app_list = self.get_app_list(request)
        context = {
            **self.each_context(request),
            'title': self.index_title,
            'app_list': app_list,
            'frontend_url': '/saturn/sandbox/dummyuser/',
            **(extra_context or {}),
        }

        react_context = json.dumps(context, cls=DjangoJSONEncoder)

        return render(request, 'saturn/index.html', {'context': react_context})

    """
    WIP: Django/React URL handlers
    """
    def get_urls(self):
        def wrap(view, cacheable=False):
            def wrapper(*args, **kwargs):
                return self.admin_view(view, cacheable)(*args, **kwargs)
            wrapper.admin_site = self
            return update_wrapper(wrapper, view)

        urlpatterns = [
            path('', wrap(self.index), name='index')
        ]

        # Add in each model's views, and create a list of valid URLS for the
        # app_index
        valid_app_labels = []
        for model, model_admin in self._registry.items():
            urlpatterns += [
                path('__%s__/%s/' % (model._meta.app_label, model._meta.model_name), include(model_admin.urls)),
            ]
            if model._meta.app_label not in valid_app_labels:
                valid_app_labels.append(model._meta.app_label)

        # If there were ModelAdmins registered, we should have a list of app
        # labels for which we need to allow access to the app_index view,
        if valid_app_labels:
            regex = r'^(?P<app_label>' + '|'.join(valid_app_labels) + ')/$'
            urlpatterns += [
                re_path(regex, wrap(self.app_index), name='app_list'),
            ]

        urlpatterns += [re_path(r'^(?:.*)/?$', wrap(self.index), name='index')]
        return urlpatterns
