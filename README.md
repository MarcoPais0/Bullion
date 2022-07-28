# Bullion

Bullion is a WebApp that simulates a cryptocurrency exchange, made as the **Final Project** for the [**CS50’s Web Programming with Python and JavaScript**](https://cs50.harvard.edu/web/2020/) course.

## Distinctiveness and Complexity

I believe this project is sufficiently distinct from all the projects made for this course because it is not too similar to any of those, eventhough it might have some features that are very similar to some features present in the other apps, for example, the login and register features. It is also seperated in two main apps, wich makes it a little more complex too.

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

I also separated the Django Project in two separate apps, the "users" and the "exchange" apps.

- **static/css/styles.css**: this file contains all the styles for the various components of the WebApp pages.

- **static/img, static/logos**: these folders contain all the images used in the WebApp.

- **static/js**
  - **checkAPI.js**: this script makes a request to the API to see if it is working. If it is not it displays a messsage in the app.
  - **currency.js**: this script loads all the data needed in the specific coin page and refreshes it using a cycle.
  - **favorite.js**: this script makes an API call to the application to add or remove a coin to an User's favorites list.
  - **markets.js**: this script loads the table for the markets page that displays the top 100 cryptocurrencies.
  - **search.js**: this script loads the search results on the search page everytime the input changes.
  - **trade.js**: this script is responsible for updating the current price and transaction value prediction in the trade page.
  - **tradingview.js**: this script is responsible for loading the trading view widget in the trade and currency pages.
  - **trending.js**: this script is responsible for loading all the trending coins in the trending page.
  
- **bullion**
  - **urls.py**: this file adds all the urls present in the users and exchange apps to the main app, bullion.
  - **settings.py**: this file contains all the settings and configurations of the bullion app. Here we include the two sub-apps on the main app.

- **users**
  - **urls.py**: this file contains all the paths possible for the users app. It also links each path to a specific view.
  - **views.py**: this file contains all the functions responsible for handling the mapping and the business logic behind the login, logout and register paths.
  - **test.py**: this file tests the User model with tests such as changing the password, verifying the username is correct and changing the username.
  - **models.py**
    - **User**: model responsible for the management of all users.
  - **admin.py**: here we include the User Model in the Admin App so we can manage all the users more easily.
  - **templates**
    - **base.html**: base template for all the other templates in the users app.
    - **login.html**: template responsible for the login page.
    - **register.html**: template responsible for the register page.
  
- **exchange**
  - **urls.py**: this file contains all the paths possible for the exchange app. It also links each path to a specific view.
  - **views.py**: this file contains all the functions that handle all the business logic and mappings behind all the paths inside the exchange app, including favorites, trades, individual coin page and all the others.
  - **test.py**: this file tests the different fuctionalities of the app.
  - **models.py**
    - **Trade**: model responsible for the storage of all trades. Every trade is stored with all the information needed.
    - **Balance**: model responsible for all the balances of all users.
    - **Favorite**: model responsible for all the favorites of all users.
  - **admin.py**: here we include the Trade, Balance and Favorite Models in the Admin App so we can manage all of them more easily.
  - **templates**
    - **base.html**: base template for all the other templates in the exchange app.
    - **currency.html**: template responsible for the individual coin page.
    - **deposit.html**: template responsible for the deposit page.
    - **homepage.html**: template responsible for the homepage.
    - **markets.html**: template responsible for the markets page, where top 100 cryptocurrencies are shown.
    - **profile.html**: template responsible for the profile page, where user's username and password can be altered and user's favorites are listed.
    - **search.html**: template responsible for the search page.
    - **trade.html**: template responsible for the trade page.
    - **trending.html**: template responsible for the trending page.
    - **wallet.html**: template responsible for the wallet page, where user's trades and balances are shown.

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
```bash
python manage.py runserver
```

# Testing

To run the application tests you have to run this command in the "manage.py" file directory.
```bash
python manage.py test
```
