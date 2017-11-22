/**
 * @author  ibolya.uveges
 * @since   0.0.1
 *
 * @description
 * This module centralizes Winston logging across the
 * server-side.
 */
(function () {
    'use strict';

    //it uses the configuration that is loaded by the config module
    // app is an id in the config file config/default.js
    const winstonCfg = require('winston-cfg');
    module.exports = winstonCfg.winstonCfg().loggers.get('app');

}());
