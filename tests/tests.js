/* global describe:false, before:false, it:false */

import { bounds } from '../src/js/config';
import { isNumber } from '../src/js/helpers';
import CardinalPoints from '../src/js/classes/cardinalPoints';
import { instruct } from '../src/js/controller';
import Martian from '../src/js/classes/martian';
import Robot from '../src/js/classes/martianRobot';
import { default as Store, lostList } from '../src/js/store';

require('./store.js');
require('./martians.js');
require('./controller.js');

/*

describe('cardinalPoints.js', () => {
  it('CardinalPoints{}', () => {
    const cp = new CardinalPoints();
    assert.strictEqual(cp.getDegree('N'), 0, 'N is a point');
    assert.strictEqual(cp.getDegree('SE'), undefined, 'SE is not a point');
    assert.strictEqual(cp.getPointName(270), 'W', 'W = 270°');
    assert.strictEqual(cp.getPointName(271), undefined, '271 doesnt correspond a point');
    assert.strictEqual(cp.isValidPoint('SE'), false, 'SE is not a point');
  });
});

describe('Config & Helpers', () => {
  before(() => {
    bounds.x = -1;
    bounds.y = 15;
  });

  it('bounds{}', () => {
    assert.strictEqual(bounds.point.get('x') === 5, true, 'assigning a negative number to bounds will return the default of 5');
    assert.strictEqual(bounds.point.get('y') === 15, true, 'assigning a positive number to bounds will return the number');
  });

  it('isNumber()', () => {
    assert.strictEqual(isNumber(null), false, 'Null test');
    assert.strictEqual(isNumber(undefined), false, 'undefined test');
    assert.strictEqual(isNumber('undefined'), false, 'string test');
    assert.strictEqual(isNumber(16), true, 'actual number');
    assert.strictEqual(isNumber(-1), true, 'a negative number is still a number');
  });
});*/
