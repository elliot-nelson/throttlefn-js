/**
 * Select a Promise implementation.
 *
 * @author Elliot Nelson
 * @license MIT License (c) copyright 2017 original author or authors
 */

'use strict';

const lib = {};

try {
    lib.Promise = require('bluebird');
} catch (e) { }

if (!lib.Promise) {
    try {
        lib.Promise = require('when').Promise;
    } catch (e) { }
}

if (!lib.Promise) {
    lib.Promise = Promise;
}

module.exports = lib;
