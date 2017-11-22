/**
 * @author  ibolyauveges
 * @since   0.0.1
 *
 * @description
 * This module initializes a NeDB database for categories and their lessons and their cards.
 * When database initialization fails, it will emit an event which will
 * stop the NodeJS server.
 *
 * @see     category.store.js
 * @see     lesson.store.js
 * @see     card.store.js
 */
(function () {
    'use strict';

    const config = require('config');
    const log   = require('../logger/logger');
    const NeDB = require('nedb');

    let dbConfig = config.get('database');

    dbConfig.onload = function (error) {
        if (error) {
            log.error('Could not load database, stopping application!', error);
            process.emit('db:error');
        } else {
            log.info('Database has been initialized successfully.');
            process.emit('db:connected');
        }
    };

    module.exports =  new NeDB(dbConfig);

}());
