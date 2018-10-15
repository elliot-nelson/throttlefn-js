/**
 * @author Elliot Nelson
 * @license MIT License (c) copyright 2017 original author or authors
 */

'use strict';

const index = require('../index');

describe('index', function () {
    beforeEach(function () {
        this.original = index.Promise;
    });

    afterEach(function () {
        index.Promise = this.original;
    });

    it('exports correctly', function () {
        expect(typeof index).toBe('function');
        expect(typeof index.n).toBe('function');
    });

    it('allows access to the underlying Promise interface', function () {
        expect(typeof index.Promise.resolve).toBe('function');
    });

    it('can set an alternate Promise interface', function () {
        index.Promise = function () {};
        index.Promise.resolve = () => { throw new Error('resolved'); };

        expect(
            index(index.n(1), () => true)
        ).toThrowError('resolved');
    });
});
