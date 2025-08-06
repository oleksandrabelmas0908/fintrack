from django.urls import path, include

from rest_framework.routers import DefaultRouter

from core.views import say_hello, RegisterUserView, AuthUserView, CategoryView


urlpatterns = [
    path("", view=say_hello, name="say_hello"),

    path("register/", RegisterUserView.as_view({'post': 'create'}), name="register_user"),
    path("auth/", AuthUserView.as_view({'post': 'post'}), name="auth_user"),  

    path("category/", CategoryView.as_view({'post': 'create'}), name="category"),
]