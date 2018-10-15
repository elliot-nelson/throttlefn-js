/**
 * @author Elliot Nelson
 * @license MIT License (c) copyright 2017 original author or authors
 */

'use strict';

const throttlefn = require('../../lib/throttlefn');

describe('throttlefn', function () {
    it('waits until condition resolves to call f', function (done) {
        let resolver;
        let p = new Promise(function (resolve, reject) {
            resolver = resolve;
        });
        
        let f = jasmine.createSpy('f').and.returnValue('example-result');
        let enter = jasmine.createSpy('enter').and.returnValue(p);
        let exit = jasmine.createSpy('exit').and.returnValue();
        let resultValue = {};

        let throttled = throttlefn(enter, f);
        throttled('example', 'args').then(function (result) {
            resultValue = result;
        });

        setTimeout(function () {
            expect(f.calls.allArgs()).toEqual([]);
            expect(exit.calls.allArgs()).toEqual([]);
            resolver(exit);
        }, 25);
        setTimeout(function () {
            expect(f.calls.allArgs()).toEqual([['example', 'args']]);
            expect(exit.calls.allArgs()).toEqual([[]]);
            expect(resultValue).toEqual('example-result');
            done();
        }, 50);
    });

    it('skips call to f if condition resolves with no exit function', function (done) {
        let resolver;
        let p = new Promise(function (resolve, reject) {
            resolver = resolve;
        });

        let f = jasmine.createSpy('f').and.returnValue('example-result');
        let enter = jasmine.createSpy('enter').and.returnValue(p);
        let exit = jasmine.createSpy('exit').and.returnValue();
        let resultValue = {};

        let throttled = throttlefn(enter, f);
        throttled('example', 'args').then(function (result) {
            resultValue = result;
        });

        setTimeout(function () {
            expect(f.calls.allArgs()).toEqual([]);
            expect(exit.calls.allArgs()).toEqual([]);
            resolver();
        }, 25);
        setTimeout(function () {
            expect(f.calls.allArgs()).toEqual([]);
            expect(exit.calls.allArgs()).toEqual([]);
            expect(resultValue).toEqual(undefined);
            done();
        }, 50);
    });
});
