/**
 * @author Elliot Nelson
 * @license MIT License (c) copyright 2017 original author or authors
 */

'use strict';

const throttle = require('../../lib/throttle');

describe('throttle', function () {
    it('only executes functions if the delay has passed', function (done) {
        let condition = throttle(500);
        let results = {};
        let timers = {
            a: 0,
            b: 100,
            c: 250,
            d: 600,
            e: 750,
            f: 950,
            g: 1180,
            h: 1200
        };
       
        Object.keys(timers).forEach(function (key) {
            setTimeout(function () {
                condition().then(function (exit) {
                    results[key] = exit;
                });
            }, timers[key]);
        });

        setTimeout(function () {
            expect(typeof results.a).toBe('function');
            expect(typeof results.b).toBe('undefined');
            expect(typeof results.c).toBe('undefined');
            expect(typeof results.d).toBe('function');
            expect(typeof results.e).toBe('undefined');
            expect(typeof results.f).toBe('undefined');
            expect(typeof results.g).toBe('function');
            expect(typeof results.h).toBe('undefined');
            done();
        }, 1400);
    });
});
