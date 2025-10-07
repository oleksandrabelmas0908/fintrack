from django.urls import path, include

from rest_framework.routers import DefaultRouter

from core.views import say_hello, RegisterUserView, AuthUserView, CategoryView, TransactionView, UserView


urlpatterns = [
    path("", view=say_hello, name="say_hello"),

    path("register/", RegisterUserView.as_view({'post': 'create'}), name="register_user"),
    path("auth/", AuthUserView.as_view({'post': 'post'}), name="auth_user"),  

    path("category/", CategoryView.as_view({'post': 'create', 'get': 'get_queryset'}), name="category"),
    path("category/<int:pk>/", CategoryView.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name="category_detail"),

    path("transaction/", TransactionView.as_view({'post': 'create'}), name="transaction"),
    path("transactions/", TransactionView.as_view({'get': 'get_transactions', 'delete': 'clear_all'}), name="transaction_list"),
    path("transaction/<int:pk>/", TransactionView.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name="transaction_detail"),

    path("user/", UserView.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name="user_detail")
]