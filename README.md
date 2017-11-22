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
### Business Logic

### Structure of the Project
* __config/default.js__: This configuration will be picked up by the config modul
* __logs/api.log__: This is the server log file (You can clange it's name and location in config/default.js file)
* __node_modules__: this is the modules of the nodejs (you can install it: npm install)
* __src/ui__: the files of the client side
  * __apiservices__: client side RestAPi Calls
  * __css__: stylesheets
  * __entity__: classes for the object of the business logic
  * __forms__: AngularJS MVC template files: Views (.html) and it's Controllers (.js)
  * __lib__: JQuery, AngularJS, Font-Awesome downloaded files 
  * __app.js__: this is the client side main runnable file
  * __index.html__: this is the start HTML file
* __src/server__: the files of the server side
  * __api__: in _every subdirectory_ there are three files:
   * __~.api.js__ is for the RestApi's server side codes
   * __~.model.js__ is for sanitizing the sended datas
   * __~.store.js__ is for the database operations
 * __database/database.js__: implements the MongoDB initialization and connection
 * __logger/logger.js__: implements the winston-cfg initialization
 * __sanitizer/sanitizer.js__: sanitizes the datas from the request it uses the XSS modul
* __index.js__: this is the main program file
* __package.json__: information about the App, and the dependecies
