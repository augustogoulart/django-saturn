from django.http import JsonResponse
from django.urls import path


class SaturnAdmin:
    def __init__(self, model):
        self.model = model

    def list(self, request):
        return JsonResponse({'list': 1})

    @property
    def urls(self):
        return [path('site/model/list', self.list)]
