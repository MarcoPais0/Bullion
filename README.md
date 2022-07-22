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

- **".js files"**
  - **"checkAPI.js"**: this script makes a request to the API to see if it is working. If it is not it displays a messsage in the app.
  - **"currency.js"**: this script loads all the data needed in the specific coin page and refreshes it using a cycle.
  - **"favorite.js"**: this script makes an API call to the application to add or remove a coin to an User's favorites list.
  - **"markets.js"**: this script loads the table for the markets page that displays the top 100 cryptocurrencies.

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
