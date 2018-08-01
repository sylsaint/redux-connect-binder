var assert = require('assert');
var _main = require('../dist/index');
describe('Main', function() {
  describe('mapStateWrapper', function() {
    let props = ['b', 'c'];
    let prefix = 'a';
    let mapStateToProps = _main.mapStateWrapper(props, prefix);
    let state = {a: {a: 0, b: 1, c: 2}};
    it('should behave right when the value is array of normal string', function() {
      let r = mapStateToProps(state);
      assert.equal(1, r.b);
      assert.equal(2, r.c);
    });
    it('should behave right when the value is array of array', function() {
        let props = [['b', 'b'], ['c', 'c']];
        let prefix = 'a';
        let mapStateToProps = _main.mapStateWrapper(props, prefix);
      let r = mapStateToProps(state);
      assert.equal(1, r.b);
      assert.equal(2, r.c);
    });
    it('should behave right when the value is array of array with function element', function() {
        let props = [['b', (o) => o.b], ['c', 'c']];
        let prefix = 'a';
        let mapStateToProps = _main.mapStateWrapper(props, prefix);
      let r = mapStateToProps(state);
      assert.equal(1, r.b);
      assert.equal(2, r.c);
    });
    it('should behave right when the value is array of object', function() {
        let props = [{name: 'b', accessor: 'b'}, {name: 'c', accessor: 'c'}];
        let prefix = 'a';
        let mapStateToProps = _main.mapStateWrapper(props, prefix);
      let r = mapStateToProps(state);
      assert.equal(1, r.b);
      assert.equal(2, r.c);
    });
    it('should behave right when the value is array of object with prefix:false', function() {
        let props = [{name: 'b', accessor: 'a.b', prefix: false}, {name: 'c', accessor: 'c'}];
        let prefix = 'a';
        let mapStateToProps = _main.mapStateWrapper(props, prefix);
      let r = mapStateToProps(state);
      assert.equal(1, r.b);
      assert.equal(2, r.c);
    });
    it('should behave right when the value is array of mixed types', function() {
        let props = ['a', ['b', (o) => o.b], {name: 'c', accessor: 'c'}];
        let prefix = 'a';
        let mapStateToProps = _main.mapStateWrapper(props, prefix);
      let r = mapStateToProps(state);
      assert.equal(0, r.a);
      assert.equal(1, r.b);
      assert.equal(2, r.c);
    });
  });
});
