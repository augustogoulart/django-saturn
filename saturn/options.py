from django.urls import path
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, GenericAPIView
from rest_framework.serializers import ModelSerializer, SerializerMethodField, Serializer
from rest_framework import serializers
from rest_framework.response import Response
from django.http import JsonResponse


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

    def get_change_serializer(self):
        class ChangeModelSerializer(ModelSerializer):
            meta = SerializerMethodField()

            class Meta:
                model = self.model
                fields = '__all__'

            def get_meta(self, model=self.model):
                hidden_fields = ['id']
                return {
                    field.name: field.__class__.__name__ for field in model._meta.get_fields()
                    if field.name not in hidden_fields
                }

        return ChangeModelSerializer

    def get_model_fields(self):
        return {field.name: field.__class__.__name__ for field in self.model._meta.get_fields()}

    def meta_model_view(self):
        # TODO - Temporary API until I figure a better way to return the meta fields.
        fields = self.get_model_fields()

        class MetaFields:
            def __init__(self, fields):
                for field in fields.keys():
                    setattr(self, field, fields.get(field))

        meta_fields = MetaFields(fields)

        class MetaModelSerializer(Serializer):
            name = serializers.JSONField()

        class MetaModelFieldsView(GenericAPIView):
            serializer_class = MetaModelSerializer

            def get(self, request):
                serializer = MetaModelSerializer(instance=meta_fields)
                return Response(serializer.data)

        return MetaModelFieldsView

    def changelist_api_view(self):
        class ChangeListAPIView(ListCreateAPIView):
            serializer_class = self.get_list_serializer()
            queryset = self.queryset

        return ChangeListAPIView

    def change_api_view(self):
        class ChangeAPIView(RetrieveUpdateDestroyAPIView):
            serializer_class = self.get_change_serializer()
            queryset = self.queryset
            lookup_url_kwarg = 'id'

        return ChangeAPIView

    def add_api_view(self, request):
        fields = self.get_model_fields()
        return JsonResponse({'meta': fields})

    @property
    def urls(self):
        app_label, model_name = self.opts.app_label, self.opts.model_name

        return [
            path(f'{app_label}/{model_name}/', self.changelist_api_view().as_view(
                model=self.model), name=f'{app_label}_{model_name}_changelist'),
            path(f'{app_label}/{model_name}/<int:id>/change/', self.change_api_view().as_view(
                model=self.model), name=f'{app_label}_{model_name}_change'),
            path(f'{app_label}/{model_name}/meta/', self.meta_model_view().as_view(model=self.model)),
            path(f'{app_label}/{model_name}/add/', self.add_api_view)
        ]
