from django.http import JsonResponse
from django.urls import path
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, GenericAPIView
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer, SerializerMethodField


class SaturnAdmin:
    list_display = None
    hidden_fields = ['id']

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
        return {field.name: field.__class__.__name__ for field in self.model._meta.get_fields()
                if field.name not in self.hidden_fields}

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

    def add_api_view(self):
        change_model_serializer = self.get_change_serializer()

        class AddView(GenericAPIView):
            def get(self, request, get_model_fields=self.get_model_fields):
                fields = get_model_fields()
                return JsonResponse({'meta': fields})

            def post(self, request):
                data = JSONParser().parse(request)
                serializer = change_model_serializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return AddView

    @property
    def urls(self):
        app_label, model_name = self.opts.app_label, self.opts.model_name

        return [
            path(f'{app_label}/{model_name}/', self.changelist_api_view().as_view(
                model=self.model), name=f'{app_label}_{model_name}_changelist'),
            path(f'{app_label}/{model_name}/<int:id>/change/', self.change_api_view().as_view(
                model=self.model), name=f'{app_label}_{model_name}_change'),
            path(f'{app_label}/{model_name}/add/', self.add_api_view().as_view(model=self.model))
        ]
