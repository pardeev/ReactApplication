// From [Mocha: Getting Started](https://mochajs.org/#getting-started)
// Uses 

import chai from 'chai';
const assert = chai.assert;
describe('Another Array Test', function() {
  describe('#indexOf()', function() {
    it('should return 1 when for the index of 2', function() {
      assert.equal([1, 2, 3].indexOf(2), 1);
    });
  });
});
