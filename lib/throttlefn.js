/**
 * Generalized promise-based concurrency guards.
 *
 * This approach is lifted directly from when.js (see when/guard), which was
 * adapted from the original concept by Sakari Jokinen (Rocket Pack, Ltd.)
 *
 * @author Elliot Nelson
 * @contributor Brian Cavalier
 * @contributor John Hann
 * @contributor Sakari Jokinen
 * @license MIT License (c) copyright 2017 original author or authors
 */
var Promise = require("bluebird");

function throttlefn(condition, f) {
    return function () {
        var that = this;
        var args = arguments;

        return Promise.resolve(condition()).then(function (exit) {
            if (exit) {
                return Promise.resolve(f.apply(that, args)).finally(exit);
            } else {
                return Promise.resolve();
            }
        });
	}
}

module.exports = throttlefn;
