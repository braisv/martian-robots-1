import { isPositiveNumber } from './helpers';
import { MAX_COORD, bounds } from './config';
import CardinalPoints from './cardinalPoints';

/*
 * defines a robot and its current state
 */

const cp = new CardinalPoints();
export default class Robot {
    constructor(name, x, y, orientation, isAlive) {
      this._name = name;
      this._x = (isPositiveNumber(x) && x <= bounds.point.get("x")) ? x : 0; // default to zero
      this._y = (isPositiveNumber(y) && y <= bounds.point.get("y")) ? y : 0; // default to zero
      this._orientation = (cp.isValidPoint(orientation)) ? orientation.toUpperCase(): "N"; // default to north
      this._isAlive = (typeof isAlive === 'boolean') ? isAlive: true; // default to true
    }
  
    set x(value) {
      if(isPositiveNumber(value) && x <= bounds.point.get("x")) {
        this._x = value;
      }
      else {
        throw new Error(`Please use a value between 0 and ${bounds.point.get("x")}`);
      }
    }
  
    get x() {
      return this._x;
    }
  
    set y(value) {
      if(isPositiveNumber(value) && y <= bounds.point.get("y")) {
        this._y = value;
      }
      else {
        throw new Error(`Please use a value between 0 and ${bounds.point.get("y")}`);
      }
    }
  
    get y() {
      return this._y;
    }
  
    set orientation(value) {
      if (cp.isValidPoint(value)) {
        this._orientation = value.toUpperCase();
      }
      else {
        throw new Error(`This orientation ${value} is not supported.`);
      }
    }
  
    get orientation() {
      return this._orientation;
    }
  
    set isAlive(value) {
      if(typeof value === 'boolean') {
          this._isAlive = value;
        }
        else {
//          this._isAlive = true;
          throw new Error("A robot can only be alive (true) or lost (false).");
        }
    }
  
    get isAlive() {
      return this._isAlive;
    }
  
    get point() {
      return new Map([["x", this._x], ["y", this._y]]);
    }
  
    toString() {
        const isAliveStr = (this._isAlive === false) ? " LOST" : "";
		return `${this._x} ${this._y} ${this._orientation}${isAliveStr}`;
	}
}