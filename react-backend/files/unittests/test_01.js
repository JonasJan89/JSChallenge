const assert = require('assert');


describe('#add()', function() {
    it('Method "add" should add to values and return the result.', function() {
        assert.equal(12, add(10,2));
    });
});

describe('#sub()', function() {
    it('Method "sub" should substitute to values and return the result.', function() {
        assert.equal(4, sub(6,2));
    });
});

describe('#mult()', function() {
    it('Method "mult" should multiply to values and return the result.', function() {
        assert.equal(4, mult(2,2));
    });
});

describe('#divideValues()', function() {
    it('Method "divideValues" should divide to values and return the result.', function() {
        assert.equal(3, divideValues(6,2));
    });
});

describe('#divideValues()', function() {
    it('Method "divideValues" should return -1 if there is a division by zero', function() {
        assert.equal(-1, divideValues(1,0));
    });
});
