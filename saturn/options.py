import json
from django.contrib.admin import ModelAdmin
from django.http import JsonResponse, HttpResponse

from .forms import UsernameForm


class SaturnAdminModel(ModelAdmin):
    def changelist_view(self, request, extra_context=None):
        queryset = self.get_queryset(request)
        actions = self.get_actions(request)
        if actions and request.method == 'POST':
            self.response_delete(request)
        return JsonResponse({"users": list(queryset.values())})

    def changeform_view(self, request, object_id=None, form_url='', extra_context=None):
        if request.method == 'POST':
            form = UsernameForm(json.loads(request.body))
            if form.is_valid():
                form.save()
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

    def response_delete(self, request):
        obj = self.get_object(request, request.body)
        self.delete_model(request, obj)
        return HttpResponse()
