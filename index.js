/**
 * @author Elliot Nelson
 * @license MIT License (c) copyright 2017 original author or authors
 */
var throttlefn = require('./lib/throttlefn');
var concurrent = require('./lib/concurrent');
var delay = require('./lib/delay');
var throttle = require('./lib/throttle');

// Out-of-the-box conditions for use with throttlefn
throttlefn.concurrent = concurrent;
throttlefn.delay = delay;
throttlefn.throttle = throttle;

// Shortened aliases for out-of-the-box conditions
throttlefn.n = concurrent;
throttlefn.ms = delay;

module.exports = throttlefn;
