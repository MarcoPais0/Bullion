import json
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login
from django.contrib.auth.hashers import check_password
from django.urls import reverse
from django.core.paginator import Paginator


from .models import Trade, Balance, Favorite


def homepage_view(request):
    if request.method == "GET":
        return render(request, "exchange/homepage.html")


def markets_view(request):
    if request.method == "GET":
        return render(request, "exchange/markets.html")


def currency_view(request, currency):
    if request.method == "GET":
        return render(request, "exchange/currency.html", {
            'currency': currency,
        })
    

def trending_view(request):
    if request.method == "GET":
        return render(request, "exchange/trending.html")


def search_view(request):
    if request.method == "GET":
        return render(request, "exchange/search.html")


@login_required
def profile_view(request):
    favorites = Favorite.objects.filter(author=request.user)

    if request.method == "GET":

        return render(request, "exchange/profile.html", {
            'favorites': favorites,
        })

    elif request.method == "POST":
        try:
            if request.POST["new_username"]:
                request.user.username = request.POST["new_username"]
                try:
                    request.user.save()
                    return render(request, "exchange/profile.html", {
                        'message': "Username Changed Successfully!",
                        'favorites': favorites,
                    })  
                except:
                    return render(request, "exchange/profile.html", {
                        'message': "Couldn't Change Username!",
                        'favorites': favorites,
                    })
        except:
            try:
                if request.POST["new_password"]:
                    if not check_password(request.POST["old_password"], request.user.password):
                        return render(request, "exchange/profile.html", {
                            'message': "Wrong Old Password!",
                            'favorites': favorites,
                        })
  
                    request.user.set_password(request.POST["new_password"])
                    request.user.save()
                    login(request, request.user)

                    return render(request, "exchange/profile.html", {
                        'message': "Password Changed Successfully!",
                        'favorites': favorites,
                    })
            except:
                return render(request, "exchange/profile.html", {
                    'message': "Invalid Action!",
                    'favorites': favorites,
                })


@login_required
def wallet_view(request):
    if request.method == "GET":
        balances = Balance.objects.filter(owner=request.user)
        trades = Trade.objects.filter(author=request.user).order_by('-date')
        paginator = Paginator(trades, 10)

        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        return render(request, "exchange/wallet.html", {
            'page_obj': page_obj,
            'range': range(1, paginator.num_pages + 1),
            'balances': balances,
        })


@login_required
def favorite_view(request):
    if request.method == "GET":

        coin = request.GET["coin"]
        try:
            favorited = Favorite.objects.filter(author=request.user, coin_id=coin)
            if favorited:
                return HttpResponse(status=200)
            else:
                return HttpResponse(status=201)
        except TypeError:
            return HttpResponse(status=202)

    elif request.method == "POST":
        data = json.loads(request.body)

        try:
            favorited = Favorite.objects.filter(author=request.user, coin_id=data.get("id"))
            if favorited:
                favorited.delete()
            else:
                fav = Favorite(author=request.user, coin_id=data.get("id"), symbol=data.get("symbol"), name=data.get("name"), image=data.get("image"))
                fav.save()
            
            return HttpResponse(status=200)
        except TypeError:
            return HttpResponse(status=202)


@login_required
def deposit_view(request):
    if request.method == "GET":
        return render(request, "exchange/deposit.html")

    elif request.method == "POST":
        balance = Balance.objects.filter(owner=request.user, coin_id="usd")

        if balance:
            balance[0].amount = float(balance[0].amount) + float(request.POST["amount"])
            balance[0].save()
        else:
            balance = Balance(owner=request.user, amount=float(request.POST["amount"]), average_price=1, coin_id="usd", symbol="USD", name="Dolar", image="static/img/usd.png")
            balance.save()
        return HttpResponseRedirect(reverse("homepage"))


@login_required
def trade_view(request, currency):

    balance = Balance.objects.filter(owner=request.user, coin_id=currency)
    balance1 = Balance.objects.filter(owner=request.user, coin_id="usd")        
    if balance:
        available = balance[0].amount
    else:
        available = 0
    if balance1:
        fiat = balance1[0].amount
    else:
        fiat = 0

    if request.method == "GET":

        return render(request, "exchange/trade.html", {
            'available': available,
            'fiat': fiat,
        })

    if request.method == "POST":
        price = float(request.POST["cur_price"])
        symbol = request.POST["symbol"]
        name = request.POST["name"]
        image = request.POST["image"]

        try:
            amount = float(request.POST["buy_amount"])
            value = amount * price
            if value > fiat or amount <= 0 or value <= 10:
                return render(request, "exchange/trade.html", {
                    'available': available,
                    'fiat': fiat,
                    'message': "Couldn't Finish The Buy Operation",
                })

            if available == 0:
                bal = Balance(owner=request.user, amount=0, average_price=0, coin_id=currency, name=name, image=image, symbol=symbol)
                bal.average_price = value / amount
                bal.amount = amount
                bal.save()
            else:
                bal = balance[0]
                bal.average_price = (float(bal.average_price * bal.amount) + value) / (float(bal.amount) + amount)
                bal.amount = float(bal.amount) + amount
                bal.save()

            trade = Trade(author=request.user, operation="BUY", price=price, amount=amount, coin_id=currency, name=name, image=image, symbol=symbol)
            trade.save()

            balance1[0].amount = float(balance1[0].amount) - value
            balance1[0].save()

            return render(request, "exchange/trade.html", {
                    'available': bal.amount,
                    'fiat': balance1[0].amount,
                    'message': "Buy Order Filled Successfully",
                })

        except:
            try:
                amount = float(request.POST["sell_amount"])
                value = amount * price
                if amount > available or amount <= 0 or available == 0 or value <= 10:
                    return render(request, "exchange/trade.html", {
                        'available': available,
                        'fiat': fiat,
                        'message': "Couldn't Finish The Sell Operation",
                    })

                bal = balance[0]
                bal.amount = float(bal.amount) - amount
                bal.save()

                trade = Trade(author=request.user, operation="SELL", price=price, amount=amount, coin_id=currency, name=name, image=image, symbol=symbol)
                trade.save()

                balance1[0].amount = float(balance1[0].amount) + value
                balance1[0].save()

                return render(request, "exchange/trade.html", {
                        'available': bal.amount,
                        'fiat': balance1[0].amount,
                        'message': "Sell Order Filled Successfully",
                    })
            
            except:
                return render(request, "exchange/trade.html", {
                    'available': bal.amount,
                    'fiat': balance1[0].amount,
                    'message': "Invalid Operation",
                })
