import { isPositiveNumber, isPosSafe } from './helpers';
import { MAX_COORD, bounds } from './config';
import CardinalPoints from './cardinalPoints';
import { lostList } from './store.js';


const cp = new CardinalPoints();
const _processMotion = new WeakMap();
const _hasScent = new WeakMap();

/*
 * defines a robot and its current state
 */
export default class Robot {
  constructor(name, x, y, orientation, isAlive) {
    this._name = (name.length == 0) ? Date.now().toString() : `${name}-${Date.now()}`;
    this._x = (isPositiveNumber(x) && x <= bounds.point.get("x")) ? x : 0; // default to zero
    this._y = (isPositiveNumber(y) && y <= bounds.point.get("y")) ? y : 0; // default to zero
    this._orientation = (cp.isValidPoint(orientation)) ? orientation.toUpperCase() : "N"; // default to north
    this._isAlive = (typeof isAlive === 'boolean') ? isAlive : true; // default to true
    
    /**
     * Private methods via WeakMaps: 
     * http://exploringjs.com/es6/ch_classes.html#_private-data-via-weakmaps
     * 
     * I wanted utility/helper functions. By definition I don't want these to show up 
     * as a robot method. At first I thought, utility module/class thingermabob i.e. robotHelpers.js. 
     * But that seemed to depart from "encapsulation" and the "single responsibility principle"; also the internets says thats a anti-pattern/code smell
     * This method works well, but the internets also says its a bit of a memory hog.
     * Its making each instantiation more expensive; 
     * in my head these helpers should only exist once and be called on-demand. *shrugs*
     */
    _processMotion.set(this, (tempPos, axis) => {
      const hs = _hasScent.get(this);
      
      switch (hs(this.point, tempPos, bounds.point.get(axis))) {
        case true:
          break;
        case false:
          this.isAlive = false;
          lostList.push(this.point);
          break;
        case null:
          this[axis] = tempPos;
          break;
      }
    });
    
    /**
     * Lost robots leave a robot “scent” which we store in `lostList[]`.
     * The scent prohibits future robots from dropping off the world at the same grid point. 
     * The scent is left at the last grid position the robot occupied before disappearing over the edge. 
     * We ignore instructions to to move “off” the world from a grid point from which a robot has been lost.
     *
     * - true: check if location has scent by looking in the lost list
     * then if the next move is fatal, don't move robot
     * 
     * - false: if location does NOT have a scent and the next move is fatal let it happen, 
     * but add the location to the lost list and update the bot status to LOST
     * 
     * - null: if the next move is safe let it happen
     */
    _hasScent.set(this, (pointStr, tempPos, axisBounds) => {
      if(lostList.find((point => point == pointStr)) && !isPosSafe(tempPos, axisBounds)) {
        return true; 
      }
      else {
        if(!isPosSafe(tempPos, axisBounds)) {
          return false; 
        }
        else {
          return null;
        }
      }
    });
  }
  
  get name() {
    return this._name; 
  }

  set x(value) {
    this._x = value;
    /*if(isPositiveNumber(value) && this._x <= bounds.point.get("x")) {
      this._x = value;
    }
    else {
      throw new Error(`Please use a 'x' value between 0 and ${bounds.point.get("x")}.`);
    }*/
  }

  get x() {
    return this._x;
  }

  set y(value) {
    this._y = value;
    /*if(isPositiveNumber(value) && this._y <= bounds.point.get("y")) {
      this._y = value;
    }
    else {
      throw new Error(`Please use a 'y' value between 0 and ${bounds.point.get("y")}.`);
    }*/
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
    return `${this._x},${this._y}`;
//    return new Map([["x", this._x], ["y", this._y]]);
  }

  toString() {
    const isAliveStr = (this._isAlive === false) ? " LOST" : "";
    return `${this._x} ${this._y} ${this._orientation}${isAliveStr}`;
  }
  
  turn(direction) {
    var degree = cp.getDegree(this._orientation);

    if(direction.toUpperCase() == "R") {
        degree = (degree == 270) ? 0 : degree + 90; // when turning right make sure degree never becomes 360 since that value is not mapped
    }
    else if (direction.toUpperCase() == "L") {
        degree = (degree == 0) ? 270 : degree - 90; // when turning left make sure degree never becomes 360 since that value is not mapped
    }

    this.orientation = cp.getPointName(degree); // orientation is defined in cardinal points so lets go back to that instead of degrees
  };
  
  /**
   * orientation determines which axis to increment/decrement along
   */
  move() {
    const pm = _processMotion.get(this);
    
    switch (this._orientation) {
      case "N":
          pm((this._y + 1), "y");
          break;
      case "S":
          pm((this._y - 1), "y");
          break;
      case "E":
          pm((this._x + 1), "x");
          break;
      case "W":
          pm((this._x - 1), "x");
        break;
    }
  }
}