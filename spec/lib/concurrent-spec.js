/**
 * @author Elliot Nelson
 * @license MIT License (c) copyright 2017 original author or authors
 */

'use strict';

const concurrent = require('../../lib/concurrent');

describe('concurrent', function () {
    it('resolves only when a concurrent slot is available', function (done) {
        let condition = concurrent(3);
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
            expect(typeof results.b).toBe('function');
            expect(typeof results.c).toBe('function');
            expect(typeof results.d).toBe('undefined');

            results.b();
        }, 25);

        setTimeout(function () {
            expect(typeof results.a).toBe('function');
            expect(typeof results.b).toBe('function');
            expect(typeof results.c).toBe('function');
            expect(typeof results.d).toBe('function');

            results.a();
            results.c();
            results.d();

            process.nextTick(done);
        }, 50);
    });

    describe('with a dynamic value', function () {
        it('waits until additional slots are available when value decreases', function (done) {
            let max = 4;
            let condition = concurrent(function () { return max; });
            let results = {};

            let fnA = condition().then(function (exit) { results.a = exit; });
            let fnB = condition().then(function (exit) { results.b = exit; });
            let fnC = condition().then(function (exit) { results.c = exit; });
            let fnD = condition().then(function (exit) { results.d = exit; });
            let fnE = condition().then(function (exit) { results.e = exit; });
            let fnF = condition().then(function (exit) { results.f = exit; });
            let fnG = condition().then(function (exit) { results.g = exit; });
            let fnH = condition().then(function (exit) { results.h = exit; });

            setTimeout(function () {
                expect(typeof results.a).toBe('function');
                expect(typeof results.b).toBe('function');
                expect(typeof results.c).toBe('function');
                expect(typeof results.d).toBe('function');
                expect(typeof results.e).toBe('undefined');
                expect(typeof results.f).toBe('undefined');
                expect(typeof results.g).toBe('undefined');
                expect(typeof results.h).toBe('undefined');

                results.b();
            }, 25);

            setTimeout(function () {
                expect(typeof results.a).toBe('function');
                expect(typeof results.b).toBe('function');
                expect(typeof results.c).toBe('function');
                expect(typeof results.d).toBe('function');
                expect(typeof results.e).toBe('function');
                expect(typeof results.f).toBe('undefined');
                expect(typeof results.g).toBe('undefined');
                expect(typeof results.h).toBe('undefined');

                max = 2;
                results.a();
                results.c();
            }, 50);

            setTimeout(function () {
                expect(typeof results.a).toBe('function');
                expect(typeof results.b).toBe('function');
                expect(typeof results.c).toBe('function');
                expect(typeof results.d).toBe('function');
                expect(typeof results.e).toBe('function');
                expect(typeof results.f).toBe('undefined');
                expect(typeof results.g).toBe('undefined');
                expect(typeof results.h).toBe('undefined');

                results.d();
                results.e();
            }, 75);

            setTimeout(function () {
                expect(typeof results.a).toBe('function');
                expect(typeof results.b).toBe('function');
                expect(typeof results.c).toBe('function');
                expect(typeof results.d).toBe('function');
                expect(typeof results.e).toBe('function');
                expect(typeof results.f).toBe('function');
                expect(typeof results.g).toBe('function');
                expect(typeof results.h).toBe('undefined');

                results.f();
                results.g();
            }, 100);

            setTimeout(function () {
                expect(typeof results.a).toBe('function');
                expect(typeof results.b).toBe('function');
                expect(typeof results.c).toBe('function');
                expect(typeof results.d).toBe('function');
                expect(typeof results.e).toBe('function');
                expect(typeof results.f).toBe('function');
                expect(typeof results.g).toBe('function');
                expect(typeof results.h).toBe('function');

                results.h();
                done();
            }, 125);
        });

        it('immediately starts more queued requests when value increases', function (done) {
            let max = 2;
            let condition = concurrent(function () { return max; });
            let results = {};

            let fnA = condition().then(function (exit) { results.a = exit; });
            let fnB = condition().then(function (exit) { results.b = exit; });
            let fnC = condition().then(function (exit) { results.c = exit; });
            let fnD = condition().then(function (exit) { results.d = exit; });
            let fnE = condition().then(function (exit) { results.e = exit; });
            let fnF = condition().then(function (exit) { results.f = exit; });
            let fnG = condition().then(function (exit) { results.g = exit; });
            let fnH = condition().then(function (exit) { results.h = exit; });

            setTimeout(function () {
                expect(typeof results.a).toBe('function');
                expect(typeof results.b).toBe('function');
                expect(typeof results.c).toBe('undefined');
                expect(typeof results.d).toBe('undefined');
                expect(typeof results.e).toBe('undefined');
                expect(typeof results.f).toBe('undefined');
                expect(typeof results.g).toBe('undefined');
                expect(typeof results.h).toBe('undefined');

                results.b();
            }, 25);

            setTimeout(function () {
                expect(typeof results.a).toBe('function');
                expect(typeof results.b).toBe('function');
                expect(typeof results.c).toBe('function');
                expect(typeof results.d).toBe('undefined');
                expect(typeof results.e).toBe('undefined');
                expect(typeof results.f).toBe('undefined');
                expect(typeof results.g).toBe('undefined');
                expect(typeof results.h).toBe('undefined');

                max = 4;
                results.a();
            }, 50);

            setTimeout(function () {
                expect(typeof results.a).toBe('function');
                expect(typeof results.b).toBe('function');
                expect(typeof results.c).toBe('function');
                expect(typeof results.d).toBe('function');
                expect(typeof results.e).toBe('function');
                expect(typeof results.f).toBe('function');
                expect(typeof results.g).toBe('undefined');
                expect(typeof results.h).toBe('undefined');

                results.c();
                results.d();
                results.e();
                results.f();
            }, 75);

            setTimeout(function () {
                expect(typeof results.a).toBe('function');
                expect(typeof results.b).toBe('function');
                expect(typeof results.c).toBe('function');
                expect(typeof results.d).toBe('function');
                expect(typeof results.e).toBe('function');
                expect(typeof results.f).toBe('function');
                expect(typeof results.g).toBe('function');
                expect(typeof results.h).toBe('function');

                results.g();
                results.h();
                done();
            }, 100);
        });
    });
});
