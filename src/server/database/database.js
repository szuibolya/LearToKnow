/**
 * @author  ibolyauveges
 * @since   0.0.1
 *
 * @description
 * This module initializes a MongoDB database for categories and their lessons and their cards.
 * When database initialization fails, it will emit an event which will
 * stop the NodeJS server.
 * This module returns a connected mongoose Database
 * The several Collection will handle in the following modules:
 * 
 * @see     category.store.js
 * @see     lesson.store.js
 * @see     card.store.js
 */

(function () {
    'use strict';

    const config = require('config');
    const log    = require('../logger/logger');
    let dbConfig = config.get('database');
    var mongoose = require('mongoose');

    var options = {
        useMongoClient: true,
        autoIndex: true, // Don't build indexes
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0
      };
      mongoose.connect(dbConfig.development, options)
        .then(() => { // if all is ok we will be here
            log.info('Database has been initialized successfully.');
            process.emit('db:connected');
        })
        .catch(error => { // we will not be here...
            log.error('Could not load database, stopping application!', error);
            process.emit('db:error');
        });
      
    module.exports =  mongoose;

}());
