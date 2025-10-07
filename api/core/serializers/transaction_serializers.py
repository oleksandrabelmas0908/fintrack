from rest_framework import serializers
from core.models import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
        read_only_fields = ('id', 'date_of_transaction', 'user')
        extra_kwargs = {
            'description': {'required': False},
            'category': {'required': False},
        }

    def validate(self, data):
        if data['amount'] <= 0:
            raise serializers.ValidationError("Amount must be greater than zero.")
        return data
