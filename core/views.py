from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

from rest_framework import viewsets
from core.models import Transaction, MyUser
from core.serializers import RegisterUserSerializer


def say_hello(request):
    return JsonResponse({"message": "Hello, World!"})


class RegisterUserView(viewsets.ModelViewSet):
    serializer_class = RegisterUserSerializer
    queryset = MyUser.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validate_email(serializer.validated_data['email'])
        user = serializer.save()
        return JsonResponse({"message": "User created successfully", "user_id": user.id}, status=201)