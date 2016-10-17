const chai = require('chai');
const expect = chai.expect, assert = chai.assert;

import { MAX_COORD, MAX_INSTRUCTION, bounds } from '../src/js/config';
import { isNumber, isPositiveNumber, botAsEmoji } from '../src/js/helpers';
import CardinalPoints from '../src/js/cardinalPoints';

describe('config.js', function() {
  before(function() {
    bounds.x = -1;
    bounds.y = 15;
  });       
         
  it('bounds{}', function() {
    assert.strictEqual(bounds.point.get("x") === 5, true, "assigning a negative number to bounds will return the default of 5");
    assert.strictEqual(bounds.point.get("y") === 15, true, "assigning a positive number to bounds will return the number");
  });
  
  it('isNumber()', function() {
    assert.strictEqual(isNumber(null), false, "Null test");
    assert.strictEqual(isNumber(undefined), false, "undefined test");
    assert.strictEqual(isNumber("undefined"), false, "string test");
    assert.strictEqual(isNumber(16), true, "actual number");
    assert.strictEqual(isNumber(-1), true, "a negative number is still a number");
  });
  
  it("CardinalPoints{}", function() {
      const cp = new CardinalPoints();
      assert.strictEqual(cp.getDegree("N"), 0, "N is a point");
      assert.strictEqual(cp.getDegree("SE"), undefined, "SE is not a point");
      assert.strictEqual(cp.getPointName(270), "W", "W = 270°");
      assert.strictEqual(cp.getPointName(271), undefined, "271 doesnt correspond a point");
      assert.strictEqual(cp.isValidPoint("SE"), false, "SE is not a point");
  });
});