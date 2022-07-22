from django.test import TestCase

from .models import User

class UserTestCase(TestCase):

    def setUp(self):
        User.objects.create(username="Marco", password="Marco")
        User.objects.create(username="Simao", password="Simao")

    def test_username_correct(self):
        marco = User.objects.get(username="Marco")
        simao = User.objects.get(username="Simao")

        self.assertEqual("Marco", marco.username)
        self.assertEqual("Simao", simao.username)

    def test_password_correct(self):
        marco = User.objects.get(username="Marco")
        self.assertEqual(marco.password, "Marco")

    def test_can_change_password(self):
        marco = User.objects.get(username="Marco")
        self.assertEqual(marco.password, "Marco")

        marco.password = "pass"
        self.assertEqual(marco.password, "pass")

    def test_can_change_username(self):
        marco = User.objects.get(username="Marco")
        self.assertEqual(marco.username, "Marco")

        marco.username = "pass"
        self.assertEqual(marco.username, "pass")

