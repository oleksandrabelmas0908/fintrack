from django.db import models

from .user import MyUser
from .category import Category


class Transaction(models.Model):
    INCOME = 'income'
    EXPENSE = 'expense'
    DIRECTION_CHOICES = [
        (INCOME, 'Income'),
        (EXPENSE, 'Expense'),
    ]

    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='transactions')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='transactions', null=True, blank=True)

    date_of_transaction = models.DateTimeField(auto_now_add=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False, help_text="Amount of the transaction")
    direction = models.CharField(max_length=7, choices=DIRECTION_CHOICES, null=False, blank=False, help_text="Direction of the transaction")
    description = models.CharField(max_length=255, blank=True, null=True, help_text="Description of the transaction")

    def __str__(self):
        return f"{self.direction.capitalize()} of {self.amount} on {self.date_of_transaction.strftime('%Y-%m-%d %H:%M:%S')}"
        
    def save(self, *args, **kwargs):
        if self.direction == self.INCOME:
            self.current_balance = self.user.balance + self.amount
        else:
            self.current_balance = self.user.balance - self.amount
        super().save(*args, **kwargs)

    def get_current_balance(self):
        return self.user.balance
    
