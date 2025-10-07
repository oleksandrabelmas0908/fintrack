from django.db import models
from django.contrib.auth.models import AbstractUser


class MyUser(AbstractUser):
    
    email = models.EmailField(max_length=255, default=None, unique=True, null=False, blank=False, help_text="User's email address")
    first_name = models.CharField(max_length=30, help_text="User's first name")
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, help_text="User's account balance")

    REQUIRED_FIELDS = ["email"]