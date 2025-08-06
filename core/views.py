from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

from core.models import Transaction, MyUser, Category
from core.serializers import RegisterUserSerializer, AuthUserSerializer, CategorySerializer


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
        token, _ = Token.objects.get_or_create(user=user)
        return JsonResponse({
            "message": "Authentication successful", 
            "user_id": user.id, 
            "token": token.key
        }, status=201)
    

class AuthUserView(viewsets.ModelViewSet):
    serializer_class = AuthUserSerializer
    queryset = MyUser.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validate(attrs=serializer.validated_data)
        user = MyUser.objects.filter(username=serializer.validated_data["username"]).first()
        
        if not user:
            return JsonResponse({"error": "User does not exist"}, status=404)
        elif user.check_password(serializer.validated_data["password"]):
            token, _ = Token.objects.get_or_create(user=user)
            return JsonResponse({
                "message": "Authentication successful", 
                "user_id": user.id, 
                "token": token.key
            }, status=200)
        else:
            return JsonResponse({"error": "Invalid credentials", "ps": user.check_password(serializer.validated_data["password"])}, status=400)
        

class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self, request):
        categories = self.queryset.filter(user=request.user)    
        if not categories:
            return JsonResponse({"message": "No categories found for this user"}, status=404)
        return JsonResponse({"categories": list(categories.values('id', 'name'))}, status=200)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validate_name(serializer.validated_data['name'])
        category = serializer.save(user=request.user)
        return JsonResponse({"message": "Category created successfully", "category_id": category.id}, status=201)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return JsonResponse(serializer.data, status=200)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.validate_name(serializer.validated_data['name'])
        category = serializer.save()
        return JsonResponse({"message": "Category updated successfully", "category_id": category.id}, status=200)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return JsonResponse({"message": "Category deleted successfully"}, status=204)
