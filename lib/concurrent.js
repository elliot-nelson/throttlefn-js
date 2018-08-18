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
function concurrent(allowed) {
    var Promise = require('./promise').Promise;
    var count = 0;
    var queue = [];
    var allowedFn = (typeof allowed === 'function' ? allowed : function () { return allowed; });

    function enter() {
        return new Promise(function (resolve) {
            if (count < allowedFn()) {
                count += 1;
                resolve(exit);
            } else {
                queue.push(resolve);
            }
        });
    }

    function exit() {
        count = Math.max(count - 1, 0);
        while (queue.length > 0 && count < allowedFn()) {
            count += 1;
            queue.shift()(exit);
        }
    }

    return enter;
}

module.exports = concurrent;
