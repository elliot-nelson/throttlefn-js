/**
 * This implementation guards a function by enforcing a maximum number
 * of concurrent async executions.
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

function concurrent(allowed) {
    var count = 0;
    var queue = [];

    function enter() {
        return new Promise(function (resolve) {
            if (count < allowed) {
                resolve(exit);
            } else {
                queue.push(resolve);
            }
            count += 1;
        });
    }

    function exit() {
        count = Math.max(count - 1, 0);
        if (queue.length > 0) {
            queue.shift()(exit);
        }
    }

    return enter;
}

module.exports = concurrent;
