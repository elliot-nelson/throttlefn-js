/**
 * This implementation guards a function by enforcing a minimum delay
 * between executions of an async function (with no regard to how long
 * each execution will take).
 *
 * @author Elliot Nelson
 * @license MIT License (c) copyright 2017 original author or authors
 */

'use strict';

function time() {
    let hr = process.hrtime();
    return hr[0] * 1000 + hr[1] / 1000000;
}

function delay(ms) {
    const Promise = require('./promise').Promise;
    let lastExecutionTime = 0;
    let queue = [];
    let timer;
    let msFn = (typeof ms === 'function' ? ms : function () { return ms; });

    function enter() {
        return new Promise(function (resolve) {
            let t = time();

            queue.push(resolve);

            if (!timer) {
                timer = setTimeout(next, msFn() - (t - lastExecutionTime));
            }
        });
    }

    function next() {
        lastExecutionTime = time();
        if (queue.length > 0) {
            queue.shift()(exit);
            timer = setTimeout(next, msFn());
        } else {
            timer = undefined;
        }
    }

    function exit() { }

    return enter;
}

module.exports = delay;
