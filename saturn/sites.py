from django.db.models.base import ModelBase
from django.shortcuts import render
from django.urls import path, include

from saturn.options import SaturnAdmin


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
            path('', self.index)
        ]

        for model, model_admin in self._registry.items():
            urlpatterns += [
                path('api/', include(model_admin.urls))
            ]
        return urlpatterns

    @property
    def urls(self):
        return self.get_urls(), 'saturn', self.name
