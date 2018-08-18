var throttlefn = require("../../lib/throttlefn");

describe("throttlefn", function () {
    it("waits until condition resolves to call f", function (done) {
        var resolver;
        var p = new Promise(function (resolve, reject) {
            resolver = resolve;
        });
        
        var f = jasmine.createSpy("f").and.returnValue("example-result");
        var enter = jasmine.createSpy("enter").and.returnValue(p);
        var exit = jasmine.createSpy("exit").and.returnValue();
        var resultValue = {};

        var throttled = throttlefn(enter, f);
        throttled("example", "args").then(function (result) {
            resultValue = result;
        });

        setTimeout(function () {
            expect(f.calls.allArgs()).toEqual([]);
            expect(exit.calls.allArgs()).toEqual([]);
            resolver(exit);
        }, 25);
        setTimeout(function () {
            expect(f.calls.allArgs()).toEqual([["example", "args"]]);
            expect(exit.calls.allArgs()).toEqual([[]]);
            expect(resultValue).toEqual("example-result");
            done();
        }, 50);
    });

    it("skips call to f if condition resolves with no exit function", function (done) {
        var resolver;
        var p = new Promise(function (resolve, reject) {
            resolver = resolve;
        });

        var f = jasmine.createSpy("f").and.returnValue("example-result");
        var enter = jasmine.createSpy("enter").and.returnValue(p);
        var exit = jasmine.createSpy("exit").and.returnValue();
        var resultValue = {};

        var throttled = throttlefn(enter, f);
        throttled("example", "args").then(function (result) {
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
