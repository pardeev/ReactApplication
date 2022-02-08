// From [Mocha: Getting Started](https://mochajs.org/#getting-started)
// Uses 

import assert from 'assert';
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
