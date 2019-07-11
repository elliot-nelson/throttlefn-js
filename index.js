/**
 * @author Elliot Nelson
 * @license MIT License (c) copyright 2017 original author or authors
 */

'use strict';

const throttlefn = require('./lib/throttlefn');
const concurrent = require('./lib/concurrent');
const delay = require('./lib/delay');
const throttle = require('./lib/throttle');
const promiselib = require('./lib/promise');

// Out-of-the-box conditions for use with throttlefn
throttlefn.concurrent = concurrent;
throttlefn.delay = delay;
throttlefn.throttle = throttle;

// Shortened aliases for out-of-the-box conditions
throttlefn.n = concurrent;
throttlefn.ms = delay;

// Allow get/set access to the internal Promise implementation
Object.defineProperty(throttlefn, 'Promise', {
    get: function () {
        return promiselib.Promise;
    },
    set: function (newPromise) {
        promiselib.Promise = newPromise;
    }
});

module.exports = throttlefn;
