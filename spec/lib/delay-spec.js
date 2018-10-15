/**
 * @author Elliot Nelson
 * @license MIT License (c) copyright 2017 original author or authors
 */

'use strict';

const delay = require('../../lib/delay');

describe('delay', function () {
    it('resolves after the expected delay has passed', function (done) {
        let condition = delay(250);
        let results = {};

        let fnA = condition().then(function (exit) {
            results.a = exit;
        });
        let fnB = condition().then(function (exit) {
            results.b = exit;
        });
        let fnC = condition().then(function (exit) {
            results.c = exit;
        });
        let fnD = condition().then(function (exit) {
            results.d = exit;
        });

        setTimeout(function () {
            expect(typeof results.a).toBe('function');
            expect(typeof results.b).toBe('undefined');
            expect(typeof results.c).toBe('undefined');
            expect(typeof results.d).toBe('undefined');
        }, 5);
        setTimeout(function () {
            expect(typeof results.a).toBe('function');
            expect(typeof results.b).toBe('function');
            expect(typeof results.c).toBe('function');
            expect(typeof results.d).toBe('undefined');
        }, 600);
        setTimeout(function () {
            expect(typeof results.a).toBe('function');
            expect(typeof results.b).toBe('function');
            expect(typeof results.c).toBe('function');
            expect(typeof results.d).toBe('function');
            done();
        }, 1001);
    });
});
