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
    var lastExecutionTime = 0;
    var queue = [];
    var timer;

    function enter() {
        return new Promise(function (resolve) {
            var t = time();

            queue.push(resolve);

            if (!timer) {
                timer = setTimeout(next, ms - (t - lastExecutionTime));
            }
        });
    }

    function next() {
        lastExecutionTime = time();
        if (queue.length > 0) {
            queue.shift()(exit);
            timer = setTimeout(next, ms);
        } else {
            timer = undefined;
        }
    }

    function exit() { }

    return enter;
}

module.exports = delay;
