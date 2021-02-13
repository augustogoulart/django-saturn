from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import DummyUser
from .serializers import DummyUserSerializer


@api_view(['GET'])
def dummy_endpoint(request):
    return Response({'status': '200_OK'})


@api_view(['GET'])
def dummy_users_list(request):
    dummy_users = DummyUser.objects.all()
    serialized = DummyUserSerializer(dummy_users, many=True)
    return Response(serialized.data)
