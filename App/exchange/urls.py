from django.urls import path

from . import views

urlpatterns = [
    path('', views.homepage_view, name='homepage'),
    path('markets', views.markets_view, name='markets'),
    path('currencies/<str:currency>', views.currency_view, name='currency'),
    path('search', views.search_view, name='search'),
    path('trending', views.trending_view, name='trending'),
    path('profile', views.profile_view, name='profile'),
    path('wallet', views.wallet_view, name='wallet'),
    path('deposit', views.deposit_view, name='deposit'),
    path('trade/<str:currency>', views.trade_view, name='trade'),


    # API Routes
    path('favorite', views.favorite_view)
]