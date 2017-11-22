/**
 * @author  ibolya.uveges
 * @since   0.0.1
 * @description
 * Server-side configuration module.
 * The configuration object will be picked up by
 * the 'config' NodeJS library.
 */
(function () {
    'use strict';
    //it can retrieve path filename, extension
    const path = require('path');

    let pathresolve = path.resolve;

    //method resolves a sequence of paths or path segments into an absolute path.
    const roots = {
        server:     pathresolve('src', 'server'),
        ui:         pathresolve('src', 'ui'),
        logs:       pathresolve('logs')
    };

    const config = {
        paths: roots,

        database: {
            filename: 'db',
            autoload: true
        },

        server: {
            port: 3000
        },

        winston: {
            loggers: [{
                id: 'app',
                level: 'info',
                transports: [{
                    type: 'Console',
                    level: 'debug',
                    colorize: true
                }, {
                    type: 'File',
                    name: 'app-log',
                    filename: pathresolve(roots.logs, 'app.log'),
                    maxfiles: 1,
                    maxsize: 1048576,
                    level: 'debug',
                    timestamp: true,
                    json: true,
                }, {
                    type: 'File',
                    name: 'error-log',
                    filename: pathresolve(roots.logs, 'errors.log'),
                    maxfiles: 1,
                    maxsize: 1048576,
                    level: 'error',
                    timestamp: true,
                    json: true,
                }]
            }]
        }
    };

    module.exports = config;

}());
