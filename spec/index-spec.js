var index = require("../index");

describe("index", function () {
    it("exports correctly", function () {
        expect(typeof index).toBe("function");
        expect(typeof index.n).toBe("function");
    });
});
