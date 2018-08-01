var assert = require('assert');
var _util = require('../dist/util');
describe('Util', function() {
  describe('accessor', function() {
    it('should return [] when the value is not present', function() {
      assert.equal(0, _util.accessor('').length);
    });
    it('should return [a] when the value is /[a-zA-Z0-9]+/', function() {
      var key = 'abc';
      assert.equal(key, _util.accessor(key)[0]);
    });
    it('should return [a, b, c] when the value is /([a-zA-Z0-9]+\.)*[a-zA-Z0-9]+/', function() {
      var key = 'a.b.c';
      assert.equal('a', _util.accessor(key)[0]);
      assert.equal('b', _util.accessor(key)[1]);
      assert.equal('c', _util.accessor(key)[2]);
    });
  });
  describe('checkType', function() {
    it(`should return ${_util.STRING} when the value is ${_util.STRING}`, function() {
      let func = () => {};
      assert.equal(_util.STRING, _util.checkType(''));
    });
    it(`should return ${_util.ARRAY} when the value is ${_util.ARRAY}`, function() {
      let func = () => {};
      assert.equal(_util.ARRAY, _util.checkType([]));
    });
    it(`should return ${_util.OBJECT} when the value is ${_util.OBJECT}`, function() {
      assert.equal(_util.OBJECT, _util.checkType({}));
    });
    it(`should return ${_util.FUNCTION} when the value is ${_util.FUNCTION}`, function() {
      let func = () => {};
      assert.equal(_util.FUNCTION, _util.checkType(func));
    });
  });
  describe('getSequenceProperty', function() {
    it(`should return 1  when the sequence is right`, function() {
      let obj = {a: {b: {c: 1}}};
      assert.equal(1, _util.getSequenceProperty(obj, ['a', 'b', (obj) => {return obj.c}]));
    });
    it(`should return itself  when the string is empty`, function() {
      let obj = {a: {b: {c: 1}}};
      assert.equal(obj, _util.getSequenceProperty(obj, ['', '']));
    });
    it(`should return itself  when the string is empty`, function() {
      let obj = {a: {b: {c: 1}}};
      assert.equal(obj, _util.getSequenceProperty(obj, ['', '']));
    });
    it(`should return undefined  when the string or function is not right`, function() {
      let obj = {a: {b: {c: 1}}};
      assert.equal(undefined, _util.getSequenceProperty(obj, ['d', (o) => o.c]));
    });
  });

});
