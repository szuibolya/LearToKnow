/**
 * @author  ibolya.uveges
 * @since   0.0.1
 *
 * @description
 * This module is the entry point of the LearnToKnow app server.
 */
(function () {
    'use strict';

    //this module search a config folder and a default.js in it
    const config = require('config');

    //this is not a system modul
    //it is for logging loads the winston-cfg logger module
    //this logger app is IIFE, thus it runs immediatelly
    const logger = require('./src/server/logger/logger');

    const express       = require('express');
    const bodyParser    = require('body-parser');
  
    //imports the own api-s for the entities 
    //you should write the filename without extension
    const categoryApi   = require('./src/server/api/category/category.api');
    /*const lessonApi     = require('./src/server/api/lesson/lesson.api');
    const cardApi       = require('./src/server/api/card/card.api');*/

    //it comes from config/default.js module
    const port          = config.get('server.port');

    //make an instance of express module
    let app = express();

    // express.use(route, function) after instantiation of the eypress
    // we can add functions to the middleware stack of the express module
    // we can define to whether route add we this function
    // missing the first (route) parameter: this functions are global for the app

    //basically tells the system that you want json to be used
    app.use(bodyParser.json());
    
    //basically tells the system whether you use
    //extended: false - a simple algorithm , then you can only parse strings or arrays
    //extended: true - complex algorithm for deep parsing that can deal with nested objects, or generally any type

    app.use(bodyParser.urlencoded({ extended: true }));

    //express.static() you can locate where are the static files: html, css, images
    app.use(express.static(config.get('paths.ui')));

    //these api-s we add to the route api
    app.use('/api', categoryApi);
   /* app.use('/api', lessonApi);
    app.use('/api', cardApi);*/
   
    
    
    

    //process.on(event, function) it is listening the given event
    //if this event occurs the function fill be called
    process.on('db:connected', () => {
        app.listen(port, () => {
            logger.info('Server started on port %d successfully.', port);
        });
    });

    process.on('db:error', () => {
        logger.info('Server can not start on port %d. An error occured', port);
        app.close();
    });

}());
