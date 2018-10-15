/**
 * This implementation enforces a minimum delay between executions of
 * an async function. Additional calls to the function before the minimum
 * delay will be discarded.
 *
 * @author Elliot Nelson
 * @license MIT License (c) copyright 2017 original author or authors
 */

'use strict';

function time() {
    let hr = process.hrtime();
    return hr[0] * 1000 + hr[1] / 1000000;
}

function throttle(ms) {
    const Promise = require('./promise').Promise;
    let lastExecutionTime = 0;
    let msFn = (typeof ms === 'function' ? ms : function () { return ms; });

    function enter() {
        return new Promise(function (resolve) {
            let t = time();

            if (t - lastExecutionTime >= msFn()) {
                lastExecutionTime = t;
                resolve(exit);
            } else {
                resolve();
            }
        });
    }

    function exit() { }

    return enter;
}

module.exports = throttle;
