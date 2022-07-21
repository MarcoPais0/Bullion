from django.contrib import admin

from .models import Trade, Balance, Favorite


admin.site.register(Trade)
admin.site.register(Balance)
admin.site.register(Favorite)
