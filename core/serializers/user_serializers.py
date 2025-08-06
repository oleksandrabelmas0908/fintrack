from rest_framework import serializers
from core.models import MyUser


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('username', 'email', 'password', 'first_name')
        extra_kwargs = {
            'password': {'write_only': True},
            'first_name': {'required': False, 'allow_blank': True}
        }

    def create(self, validated_data):
        user = MyUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        
        if 'first_name' in validated_data:
            user.first_name = validated_data['first_name']

        user.set_password(validated_data['password'])
        return user

    def validate_email(self, value):
        if MyUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already in use.")
        
        return value