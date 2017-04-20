var Promise = require("bluebird");
var concurrent = require("../../lib/concurrent");

describe("concurrent", function () {
    it("does", function (done) {
        var condition = concurrent(3);
        var results = {};

        var fnA = condition().then(function (exit) {
            results.a = exit;
        });
        var fnB = condition().then(function (exit) {
            results.b = exit;
        });
        var fnC = condition().then(function (exit) {
            results.c = exit;
        });
        var fnD = condition().then(function (exit) {
            results.d = exit;
        });

        process.nextTick(function () {
            expect(typeof results.a).toBe("function");
            expect(typeof results.b).toBe("function");
            expect(typeof results.c).toBe("function");
            expect(typeof results.d).toBe("undefined");

            results.b();

            process.nextTick(function () {
                expect(typeof results.a).toBe("function");
                expect(typeof results.b).toBe("function");
                expect(typeof results.c).toBe("function");
                expect(typeof results.d).toBe("function");

                results.a();
                results.c();
                results.d();

                process.nextTick(done);
            });
        });
    });
});
