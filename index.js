/**
 * @author Elliot Nelson
 * @license MIT License (c) copyright 2017 original author or authors
 */
var throttlefn = require('./lib/throttlefn');
var concurrent = require('./lib/concurrent');
var delay = require('./lib/delay');
var throttle = require('./lib/throttle');
var promiselib = require('./lib/promise');

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
