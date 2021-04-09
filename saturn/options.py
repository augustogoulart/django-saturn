from django.http import JsonResponse
from django.urls import path


class SaturnAdmin:
    def __init__(self, model):
        self.model = model
        self.opts = model._meta

    def changelist_view(self, request):
        return JsonResponse(
            {'model': self.opts.app_label, 'listDisplay': [], 'title': 'Title'})

    @property
    def urls(self):
        app_label, model_name = self.opts.app_label, self.opts.model_name

        return [
            path(f'{app_label}/{model_name}/', self.changelist_view, name=f'{app_label}_{model_name}_changelist')
        ]
