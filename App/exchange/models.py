from symtable import Symbol
from django.db import models

from users.models import User


class Trade(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    operation = models.TextField()
    price = models.DecimalField(decimal_places=6, max_digits=30)
    amount = models.DecimalField(decimal_places=6, max_digits=30)
    coin_id = models.TextField()
    symbol = models.TextField()
    name = models.TextField()
    image = models.TextField()
    date = models.DateTimeField(auto_now_add=True, editable=False)

class Balance(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(decimal_places=6, max_digits=30)
    average_price = models.DecimalField(decimal_places=6, max_digits=30)
    coin_id = models.TextField()
    symbol = models.TextField()
    name = models.TextField()
    image = models.TextField()

class Favorite(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    coin_id = models.TextField()
    symbol = models.TextField()
    name = models.TextField()
    image = models.TextField()
