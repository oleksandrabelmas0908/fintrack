from rest_framework import serializers
from core.models import Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'user']  
        extra_kwargs = {
            'user': {'read_only': True},
        }

    def validate_name(self, name):
        category = Category.objects.filter(name=name).first()
        if category:
            raise serializers.ValidationError("Category name is already used.")
        return name