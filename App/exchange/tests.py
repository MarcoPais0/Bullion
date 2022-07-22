from django.test import TestCase

from users.models import User
from .models import Balance, Favorite, Trade

class BalanceTestCase(TestCase):

    def setUp(self):
        User.objects.create(username="Marco", password="Marco")
        User.objects.create(username="Simao", password="Simao")
        
        Balance.objects.create(owner=User.objects.get(username="Marco"), amount=10, average_price=1, coin_id="usd", symbol="USD", name="Dolar", image="static/img/usd.png")
        Balance.objects.create(owner=User.objects.get(username="Simao"), amount=30, average_price=1, coin_id="usd", symbol="USD", name="Dolar", image="static/img/usd.png")

    def test_balance_correct(self):
        marco = User.objects.get(username="Marco")
        balance = Balance.objects.get(owner=marco, coin_id="usd")

        self.assertEqual(balance.amount, 10)
