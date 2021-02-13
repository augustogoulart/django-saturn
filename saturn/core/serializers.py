from rest_framework import serializers
from saturn.core.models import DummyUser


class DummyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = DummyUser
        fields = ['id', 'name']
