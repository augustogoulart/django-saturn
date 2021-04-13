from django.urls import path
from rest_framework.generics import ListCreateAPIView
from rest_framework.serializers import ModelSerializer, SerializerMethodField


class ChangeListAPIView(ListCreateAPIView):
    def list(self, request, *args, **kwargs):
        response = super().list(request, args, kwargs)
        response.data.append({'meta': {'id': 'int', 'listDisplay': 'list', 'username': 'text'}})
        return response


class SaturnAdmin:
    list_display = None

    def __init__(self, model):
        self.model = model
        self.opts = model._meta
        self.app_label = self.opts.app_label
        self.model_name = self.opts.model_name

    def get_serializer(self):
        class ModelAdminSerializer(ModelSerializer):
            listDisplay = SerializerMethodField()

            class Meta:
                model = self.model
                fields = '__all__'

            def get_listDisplay(self, obj):
                return str(obj) or self.listDisplay

        return ModelAdminSerializer

    @property
    def urls(self):
        queryset = self.model.objects.all()
        app_label, model_name = self.opts.app_label, self.opts.model_name

        return [
            path(f'{app_label}/{model_name}/', ChangeListAPIView.as_view(
                queryset=queryset,
                serializer_class=self.get_serializer(),
                model=self.model), name=f'{app_label}_{model_name}_changelist'),

            path(f'{app_label}/{model_name}/add/', ListCreateAPIView.as_view(
                queryset=queryset,
                serializer_class=self.get_serializer(),
                model=self.model))
        ]
