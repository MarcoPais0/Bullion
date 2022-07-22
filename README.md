# Bullion

Bullion is a WebApp that simulates a cryptocurrency exchange, made as the **Final Project** for the [**CS50’s Web Programming with Python and JavaScript**](https://cs50.harvard.edu/web/2020/) course.

## Distinctiveness and Complexity

I believe this project is sufficiently distinct from all the projects made for this course because it is not too similar to any of these, eventhough it might have some features that are very similar to some features present in the other apps, for example, the login and register features.

The **complexity** is greater than all the other projects too because it involves the consuming of an API and the project has a big list of features.

This project also makes use of **4 Django Models** and a series of **JavaScript** files.

During all the **testing** done the **WebApp was mobile-responsive** allowing me to use all the features available in the app.

# Description

## Technologies Used

For this project I used **Python**, **Django**, **JavaScript**, **HTML** and **CSS**.

To retrieve all the information about the many cryptocurrencies in real time I used [Coin Gecko's API](https://www.coingecko.com/en/api/documentation) because it was easy to use, it has all the data the application needs, it has no request limit and no API key was needed.

To import the price charts I used [Trading View's Widget](https://www.tradingview.com/widget/advanced-chart/).

## Files

In this section I will not explain the various settings files and the irrelevant files like the ".css" or the ".png" files.

**I will only explain ".html", ".js", "models.py", "tests.py" and "views.py" files.**

I also separated the Django Project in two separate apps, the "users" and the "exchange" apps.

- **".js files"**
  - **"checkAPI.js"**: this script makes a request to the API to see if it is working. If it is not it displays a messsage in the app.
  - **"currency.js"**: this script loads all the data needed in the specific coin page and refreshes it using a cycle.
  - **"favorite.js"**: this script makes an API call to the application to add or remove a coin to an User's favorites list.
  - **"markets.js"**: this script loads the table for the markets page that displays the top 100 cryptocurrencies.
  - **"search.js"**: this script loads the search results on the search page everytime the input changes.
  - **"trade.js"**: this script is responsible for updating the current price and transaction value prediction in the trade page.
  - **"tradingview.js"**: this script is responsible for loading the trading view widget in the trade and currency pages.
  - **"trending.js"**: this script is responsible for loading all the trending coins in the trending page.
  
- **".html files"**
  - **"users/base.html"**: base template for all the other templates in the users app.
  - **"users/login.html"**: template responsible for the login page.
  - **"users/register.html"**: template responsible for the register page.
  - **"exchange/base.html"**: base template for all the other templates in the exchange app.
  - **"exchange/currency.html"**: template responsible for the individual coin page.
  - **"exchange/deposit.html"**: template responsible for the deposit page.
  - **"exchange/homepage.html"**: template responsible for the homepage.
  - **"exchange/markets.html"**: template responsible for the markets page, where top 100 cryptocurrencies are shown.
  - **"exchange/profile.html"**: template responsible for the profile page, where user's username and password can be altered and user's favorites are listed.
  - **"exchange/search.html"**: template responsible for the search page.
  - **"exchange/trade.html"**: template responsible for the trade page.
  - **"exchange/trending.html"**: template responsible for the trending page.
  - **"exchange/wallet.html"**: template responsible for the wallet page, where user's trades and balances are shown.
  
- **"models.py files"**
  - **"User"**: model responsible for the management of all users.
  - **"Trade"**: model responsible for the storage of all trades. Every trade is stored with all the information needed.
  - **"Balance"**: model responsible for all the balances of all users.
  - **"Favorite"**: model responsible for all the favorites of all users.

# Installation

To install this project you must **fork** this repository.

# Running

Make sure you have **Python** and **Django** installed.

**Before** running the project **migrations must be made and applied** to the project.
For this open the command terminal in the **"manage.py"** directory.

Run the following commands in the terminal.
```bash
python manage.py makemigrations
python manage.py migrate
```
Now we can run the project using the following command.
```
python manage.py runserver
```

# Testing
