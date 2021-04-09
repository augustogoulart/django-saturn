from django.db.models.base import ModelBase
from django.http import JsonResponse
from django.shortcuts import render
from django.urls import path, include, re_path

from saturn.options import SaturnAdmin

mock_list_registered_response = [
    {
        'name': 'Authentication and Authorization',
        'appLabel': 'auth',
        'appUrl': '/saturn/auth/',
        'hasModulePerms': True,
        'models': [
            {
                'name': 'Groups',
                'objectName': 'Group',
                'perms': {
                    'add': True,
                    'change': True,
                    'delete': True,
                    'view': True
                },
                'adminUrl': '/saturn/auth/group/',
                'addUrl': '/saturn/auth/group/add/',
                'viewOnly': False
            },
            {
                'name': 'Users',
                'objectName': 'User',
                'perms': {
                    'add': True,
                    'change': True,
                    'delete': True,
                    'view': True
                },
                'adminUrl': '/saturn/auth/user/',
                'addUrl': '/saturn/auth/user/add/',
                'viewOnly': False
            }
        ]
    },
    {
        'name': 'Sandbox',
        'appLabel': 'sandbox',
        'appUrl': '/saturn/sandbox/',
        'hasModulePerms': True,
        'models': [
            {
                'name': 'Dummy products',
                'objectName': 'DummyProduct',
                'perms':
                    {
                        'add': True,
                        'change': True,
                        'delete': True,
                        'view': True
                    },
                'adminUrl': '/saturn/sandbox/dummyproduct/',
                'addUrl': '/saturn/sandbox/dummyproduct/add/',
                'viewOnly': False
            },
            {
                'name': 'Dummy users',
                'objectName': 'DummyUser',
                'perms': {
                    'add': True,
                    'change': True,
                    'delete': True,
                    'view': True},
                'adminUrl': '/saturn/sandbox/dummyuser/',
                'addUrl': '/saturn/sandbox/dummyuser/add/', 'view_only': False
            }]
    }]


class SaturnSite:
    def __init__(self):
        self._registry = {}
        self.name = 'saturn'

    def register(self, model_or_iterable):
        if isinstance(model_or_iterable, ModelBase):
            model_or_iterable = [model_or_iterable]

        for model in model_or_iterable:
            self._registry[model] = SaturnAdmin(model)

    def index(self, request):
        return render(request, 'saturn/index.html')

    def get_urls(self):
        urlpatterns = [
            path('', self.index, name='index'),
            path('api/registered/', self.list_registered)
        ]

        for model, model_admin in self._registry.items():
            urlpatterns += [
                path('api/', include(model_admin.urls))
            ]

        # Delegate non-mapped paths to react-router.
        # This covers 404s and other error codes.
        urlpatterns += [re_path(r'^(?:.*)/?$', self.index)]
        return urlpatterns

    def list_registered(self, request):
        return JsonResponse({"appList": mock_list_registered_response})

    @property
    def urls(self):
        return self.get_urls(), 'saturn', self.name
