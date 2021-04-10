from django.urls import path
from rest_framework.generics import ListCreateAPIView
from rest_framework.serializers import ModelSerializer, SerializerMethodField


class SaturnAdmin:

    list_display = None

    def __init__(self, model):
        self.model = model
        self.opts = model._meta
        self.app_label = self.opts.app_label
        self.model_name = self.opts.model_name

    def get_serializer(self):
        class ModelAdminSerializer(ModelSerializer):
            list_display = SerializerMethodField()

            class Meta:
                model = self.model
                fields = '__all__'

            def get_list_display(self, obj):
                return str(obj) or self.list_display

        return ModelAdminSerializer

    @property
    def urls(self):
        queryset = self.model.objects.all()
        app_label, model_name = self.opts.app_label, self.opts.model_name

        return [
            path(f'{app_label}/{model_name}/', ListCreateAPIView.as_view(
                queryset=queryset,
                serializer_class=self.get_serializer(),
                model=self.model))
        ]
