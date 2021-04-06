from django.http import HttpResponse
from django.urls import path


class SaturnAdmin:
    def __init__(self, model):
        self.model = model

    def list_registered(self, request):
        return HttpResponse('ok')

    @property
    def urls(self):
        return [path('site/registered/', self.list_registered)]
