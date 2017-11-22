/**
 * @author ibolyauveges
 * @since   0.0.1
 *
 * @description
 * This module is a wrapper around the xss Node library,
 * providing convenience functions for sanitizing
 * various data types.
 * XSS: Cross-site scripting (XSS) is a type of computer security vulnerability typically found in web applications.
 * XSS enables attackers to inject client-side scripts into web pages viewed by other users.
 * this modul remove the dangerous part of string datas
 */
(function () {
    'use strict';

    const xss = require('xss');

    let sanitizer = {};

    sanitizer.sanitizeString = function (s) {
        if (typeof s !== 'string') {
            return '';
        }

        return xss(s);
    };

    module.exports = sanitizer;

}());
