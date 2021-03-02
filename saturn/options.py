from django.contrib.admin import ModelAdmin
from django.http import JsonResponse


class SaturnAdminModel(ModelAdmin):

    def changelist_view(self, request, extra_context=None):
        queryset = self.get_queryset(request)
        return JsonResponse({"users": list(queryset.values())})

    def _changeform_view(self, request, object_id, form_url, extra_context):
        obj = self.get_object(request, object_id)
        return JsonResponse({'id': obj.id, 'name': obj.name})
