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
  There are three levels to collect your datas for learning
* __categories__: in this level you can organise your datas by the main properties for example: German B2 Exam words, Geograpy themes, etc.
  * __lessons__: in this level you can add subthemes to your categories for example: Familie, Haushalt,Umwelt to German B2 Exam words
   * __cards__:in this level you can add the cards for making test. There are different type of Cards
    * _TRANSLATE_: normal test - you see a word and you should type it's translation
    * _DICTIONARY_: you can see a definition of a word and you should type the word
    * _GAP-FILL_: there are some missing word in the sentence that you see and you should type the missing words
    * _MULTI-CHOICE_: you can see a sentence with a gap and three possible answers. You should choose the right answer
    * _QUESTIONING_:it is very similar to _DICTIONARY_, but you can see a word and you should say the definition of the word. It should check yourself
The tests will be checked and the result of the tests appears in the box of the categories, lessons.

You can load the lessons level if you click on the upper side of the category box
You can load the cards level if you click on the top of the lesson box
You can edit the categories or lessons or cards if you click on the pencil icon in the bottom of the box
You can see the description of the categories or lessons if you click on the ? icon in the bottom of the box
You can remove a category or lesson or a card if you click on the x icon in the bottom of the box
You can start a Test if you click on the !Testout icon in the bottom of the box

### Structure of the Project
* __config/default.js__: This configuration will be picked up by the config modul
* __logs/api.log__: This is the server log file (You can clange it's name and location in config/default.js file)
* __node_modules__: this is the modules of the nodejs (you can install it: npm install)
* __src/ui__: the files of the client side
  * __apiservices__: client side RestAPi Calls
  * __css__: stylesheets
  * __entity__: classes for the objects of the business logic
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
