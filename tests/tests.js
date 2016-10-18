const chai = require('chai');
const expect = chai.expect, assert = chai.assert;

import { MAX_INSTRUCTION, bounds } from '../src/js/config';
import { isNumber, isPositiveNumber, botAsEmoji } from '../src/js/helpers';
import CardinalPoints from '../src/js/cardinalPoints';
import { instruct } from '../src/js/controller';
import Martian from '../src/js/martian';
import Robot from '../src/js/martianRobot';
import { lostList } from '../src/js/store.js';



describe('Martians & Robots', function() {
  before(function() {
    bounds.x = 5; bounds.y = 3;
  });
  
  it('Martians', function() {
    const m = new Martian("", -1, 4, "sw", "lost");
    assert.isAbove(m.name.length, 0, "Name can't be blank, should have been defaulted to Date.now().");
    try {
      m.name = "Byron";
    }
    catch(e) {
      console.log(e);
    }
    assert.notEqual(m.name, "Byron", "Can't set the name after initialization.");
    
    
    assert.strictEqual(m.x, 0, "Negative values are invalid for initialization, defaults to zero.");
    assert.strictEqual(m.y, 0, "Values above the boundary are invalid for initialization, defaults to zero.");
    assert.strictEqual(m.point, "0,0", "Invalid x,y values defaults to zero.");
    
    assert.strictEqual(m.orientation, "N", "Invalid orientations will be set to north on initialization.");
    try {
      m.orientation = "se";
    }
    catch(e) {
      console.log(e);
    }
    assert.strictEqual(m.orientation, "N", "Invalid orientations will fail on assignment, thus leaving the previous value.");
    
    assert.strictEqual(m.isAlive, true, "Invalid live status will be set to true on initialization.");
    try {
      m.isAlive = "fL";
    }
    catch(e) {
      console.log(e);
    }
    assert.strictEqual(m.isAlive, true, "Invalid live status will fail on assignment, thus leaving the previous value.");
  });
  
  it('Robots', function() {
    const r = new Martian(" ", 4, 2, "E", true);
    assert.isAbove(r.name.length, 0, "Name can't be blank, should have been defaulted to Date.now().");
  });
});

describe('controller.js', function() {
  before(function() {
    bounds.x = 5; bounds.y = 3;
  });
  
  it('instruct()', function() {
    const bot1 = new Robot("bot 1", 1, 1, "E", true);
    const bot2 = new Robot("bot 2", 3, 2, "N", true);
    const bot3 = new Robot("bot 3", 0, 3, "W", true);
    const aMartian = new Martian("aMartian", 3, 2, "N", true); // initialized the same as bot 2
    
    assert.strictEqual(instruct(bot1, "RFRFRFRF").toString(), "1 1 E", "Test: 1 1 E");
    assert.strictEqual(instruct(bot2, "FRRFLLFFRRFLL").toString(), "3 3 N LOST", "Test: 3 2 N");
    assert.strictEqual(lostList.find((point => point === "3,3")), "3,3", "confirm that the position of the lost robot is added to the list");
    assert.isAtLeast(instruct(aMartian, "FRRFLLFFRRFLLFFF").y, 3, "Y coords should be greater than 3 which is where bot 2 was lost '3,3'");  
    assert.strictEqual(lostList.find((point => point === "3,3")), "3,3", "confirm that the position of the lost robot is added to the list");
    assert.strictEqual(instruct(bot3, "LLFFFLFLFL").toString(), "2 3 S", "Test: 0 3 W");  
  });
});

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