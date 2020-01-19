# README

### What is this repository for?

* Nodejs Video uplading on Youtube 
* Version 0.1

### Create a Google Application
* Open your Google console and create the project by clicking the Create Project button.

* Set the project name in the popup that was opened.
* After the application is created, go to APIs & auth and click the APIs menu item.
* Here you have to enable the YouTube Data API. For that, click the YouTube Data API link and then click the Enable API button.
* Before getting the credentials, you have to set the Consent screen information (the product name is mandatory):
* Now it's the time to get the application credentials. But there are no credentials yet. You have to create the OAuth2 Client ID. To do that, go to Credentials page and click Create new Client ID. A popup will be opened.
* Set the Authorized JavaScript origins, just put http://localhost:5000 because there will run our local server (you may add other origins like development and production urls). The callback url is http://localhost:5000/oauth2callback after allowing the application to access your account (YouTube resources in this case), you will be redirected there.
* After clicking the Create Client ID button, you will get your credentials.
* Now click the Download JSON button to download the credentials in JSON format.
* Put credentials.json file in a config folder

### Install dependencies

* npm i on Root folder

### Run application

* npm run start

### Tecnologies

* Nodejs
* Multer.js
* Express
* Oauth2
* youtube-api

