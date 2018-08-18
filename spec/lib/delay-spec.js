var delay = require("../../lib/delay");

describe("delay", function () {
    it("resolves after the expected delay has passed", function (done) {
        var condition = delay(250);
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

        setTimeout(function () {
            expect(typeof results.a).toBe("function");
            expect(typeof results.b).toBe("undefined");
            expect(typeof results.c).toBe("undefined");
            expect(typeof results.d).toBe("undefined");
        }, 5);
        setTimeout(function () {
            expect(typeof results.a).toBe("function");
            expect(typeof results.b).toBe("function");
            expect(typeof results.c).toBe("function");
            expect(typeof results.d).toBe("undefined");
        }, 600);
        setTimeout(function () {
            expect(typeof results.a).toBe("function");
            expect(typeof results.b).toBe("function");
            expect(typeof results.c).toBe("function");
            expect(typeof results.d).toBe("function");
            done();
        }, 1001);
    });
});
