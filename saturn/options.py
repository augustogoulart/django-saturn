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

    def base_model_serializer(self):
        class BaseModelAdminSerializer(ModelSerializer):
            listDisplay = SerializerMethodField()

            class Meta:
                model = self.model
                fields = '__all__'

            def get_listDisplay(self, obj):
                return str(obj) or self.listDisplay

        return BaseModelAdminSerializer

    def get_list_serializer(self):
        class ListModelSerializer(self.base_model_serializer()):
            listDisplay = SerializerMethodField()

            class Meta:
                model = self.model
                fields = '__all__'

            def get_listDisplay(self, obj):
                return str(obj) or self.listDisplay

        return ListModelSerializer

    def changelist_api_view(self):
        class ChangeListAPIView(ListCreateAPIView):
            serializer_class = self.get_list_serializer()
            queryset = self.queryset

        return ChangeListAPIView

    def get_change_serializer(self):
        class ChangeModelSerializer(ModelSerializer):
            meta = SerializerMethodField()

            def get_meta(self, obj):
                hidden_fields = ['id']
                return {
                    field.name: field.__class__.__name__ for field in obj._meta.get_fields()
                    if field.name not in hidden_fields
                }

            class Meta:
                model = self.model
                fields = '__all__'

        return ChangeModelSerializer

    def change_api_view(self):
        class ChangeAPIView(RetrieveUpdateDestroyAPIView):
            serializer_class = self.get_change_serializer()
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
                serializer_class=self.get_list_serializer(),
                model=self.model)),

            path(f'{app_label}/{model_name}/<int:id>/change/', self.change_api_view().as_view(
                model=self.model), name=f'{app_label}_{model_name}_change'),
        ]
