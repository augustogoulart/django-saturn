import json
from django.contrib.admin import ModelAdmin
from django.http import JsonResponse, HttpResponse

from .forms import UsernameForm


class SaturnAdmin:
    pass


class SaturnAdminModelOld(ModelAdmin):
    def get_context_for_str(self, request):
        queryset = self.get_queryset(request)
        context = []

        for obj in queryset:
            context.append({"id": obj.id, "str": str(obj)})

        return context

    def get_list_display_for_context(self, request):
        list_display = self.get_list_display(request)
        if "__str__" in list_display:
            return {"columns": 'str', "context": self.get_context_for_str(request)}
        return {"columns": list_display, "context": self.get_queryset(request)}

    def changelist_view(self, request, extra_context=None):
        queryset = self.get_queryset(request)
        actions = self.get_actions(request)

        if actions and request.method == 'POST':
            self.response_delete(request)

        return JsonResponse({
            queryset.model._meta.model_name: list(queryset.values()),
            "listDisplay": self.get_list_display_for_context(request),
            "title":  queryset.model._meta.verbose_name_plural
        })

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
