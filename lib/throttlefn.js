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
function throttlefn(condition, f) {
    var Promise = require('./promise').Promise;

    return function () {
        var that = this;
        var args = arguments;

        return Promise.resolve(condition()).then(function (exit) {
            if (exit) {
                // Equivalent to `.finally(exit)`, but we want to use only node v6 Promise methods.
                return Promise.resolve(f.apply(that, args))
                    .then(result => {
                        exit();
                        return result;
                    }).catch(error => {
                        exit();
                        throw error;
                    });
            } else {
                return Promise.resolve();
            }
        });
    }
}

module.exports = throttlefn;
