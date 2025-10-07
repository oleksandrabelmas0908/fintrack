from django.db import models

from .user import MyUser


class Category(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='categories')

    name = models.CharField(max_length=100, unique=True, help_text="Name of the category")

    def __str__(self):
        return self.name