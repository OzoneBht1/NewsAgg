from rest_framework import permissions
from rest_framework import generics
from account.models import UserProfile
from .serializers import UserProfileCreateSerializer, UserProfileSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserProfileCreateApi(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileCreateSerializer


class UserProfileDetailApi(generics.RetrieveAPIView):
    queryset = UserProfile.objects.filter(id=1)
    serializer_class = UserProfileSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = ['token/', 'token/refresh']
    return Response(routes)


# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)

#         # Add custom claims
#         token['country'] = user.country
#         # ...

#         return token


# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer
