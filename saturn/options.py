from django.urls import path
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.serializers import ModelSerializer, SerializerMethodField


class SaturnAdmin:
    list_display = None

    def __init__(self, model):
        self.model = model
        self.opts = model._meta
        self.app_label = self.opts.app_label
        self.model_name = self.opts.model_name
        self.queryset = self.model.objects.all()

    def get_model_serializer(self):
        class ModelAdminSerializer(ModelSerializer):
            listDisplay = SerializerMethodField()

            class Meta:
                model = self.model
                fields = '__all__'

            def get_listDisplay(self, obj):
                return str(obj) or self.listDisplay

        return ModelAdminSerializer

    def changelist_api_view(self):
        class ChangeListAPIView(ListCreateAPIView):
            serializer_class = self.get_model_serializer()
            queryset = self.queryset

        return ChangeListAPIView

    def change_api_view(self):
        class ChangeAPIView(RetrieveUpdateDestroyAPIView):
            serializer_class = self.get_model_serializer()
            queryset = self.queryset
            lookup_url_kwarg = 'id'

        return ChangeAPIView

    @property
    def urls(self):
        queryset = self.model.objects.all()
        app_label, model_name = self.opts.app_label, self.opts.model_name

        return [
            path(f'{app_label}/{model_name}/', self.changelist_api_view().as_view(
                model=self.model), name=f'{app_label}_{model_name}_changelist'),

            path(f'{app_label}/{model_name}/add/', ListCreateAPIView.as_view(
                queryset=queryset,
                serializer_class=self.get_model_serializer(),
                model=self.model)),

            path(f'{app_label}/{model_name}/<int:id>/change/', self.change_api_view().as_view(
                model=self.model), name=f'{app_label}_{model_name}_change'),
        ]
