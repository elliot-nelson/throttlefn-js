/**
 * This implementation guards a function by enforcing a minimum delay
 * between executions of an async function (with no regard to how long
 * each execution will take).
 *
 * @author Elliot Nelson
 * @license MIT License (c) copyright 2017 original author or authors
 */
var Promise = require("bluebird");

function time() {
    var hr = process.hrtime();
    return hr[0] * 1000 + hr[1] / 1000000;
}

function delay(ms) {
    var lastCall = 0;
    var queue = [];

    function enter() {
        return Promise(function (resolve) {
            var t = time();
            queue.push(resolve);

            if (t - lastCall > ms) {
                exit();
            }
        });
    }

    function exit() {
        var t = time();
        if (t - lastCall > ms) {
            queue.shift()(exit);
        } else {
            Promise.delay(ms - (t - lastCall)).then(function () {
                queue.shift()(exit);
            });
        }
        lastCall = t;
    }
}

module.exports = delay;
