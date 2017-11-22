# LearToKnow App
### This is a Web application for the easier learning.

#### Prerequisites
* [NodeJS (8.6.0)](https://nodejs.org/en/)
* [MongoDB] (https://www.mongodb.com/)
* nodemon package: npm install nodemon -g

#### Install Dependencies
You can install the dependencies using the following commands:
```
npm install
```
### Build

Build the project (default destination is `dist`):

~~~~
    npm run build
~~~~
### Run
```
nodemon index.js
```

#### Structure of the Project
```
* config/default.js: This configuration will be picked up by the config modul
* logs/api.log: This is the server log file (You can clange it's name and location in config/default.js file)
* node_modules: this is the modules of the nodejs (you can install it: npm install)
* src/ui: the files of the client side
   * apiservices: client side RestAPi Calls
   * css: stylesheets
   * entity: classes for the object of the business logic
   * forms: AngularJS MVC template files: Views (.html) and it's Controllers (.js)
   * lib: JQuery, AngularJS, Font-Awesome downloaded files 
   * app.js: this is the client side main runnable file
   * index.html: this is the start HTML file
* src/server: the files of the server side
  * 
* index.js: this is the main program file
* package.json: information about the App, and the dependecies

```
