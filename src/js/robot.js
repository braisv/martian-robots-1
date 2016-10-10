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
    this._name = name;
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
    _processMotion.set(this, (bot, tempPos, axis) => {
      /*switch (_hasScent(bot.point, tempPos, bounds.point.get(axis))) {
          case true:
            break;
          case false:
            bot.isAlive = false;
            _lostList.push(bot.point);
            break;
          case null:
            bot[axis] = tempPos;
            break;
        }*/
    });
    
    /**
     * Lost robots leave a robot “scent” which we store in `lostList[]`.
     * The scent prohibits future robots from dropping off the world at the same grid point. 
     * The scent is left at the last grid position the robot occupied before disappearing over the edge. 
     * We ignore instructions to to move “off” the world from a grid point from which a robot has been lost.
     */
    _hasScent.set(this, (pointStr, newPos, axisBounds) => {
      if(lostList.find((point => point == pointStr)) && !isPosSafe(newPos, axisBounds)) {
        return true; 
      }
      else {
        if(!isPosSafe(newPos, axisBounds)) {
          return false; 
        }
        else {
          return null;
        }
      }
    });
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
    return `${this._x},${this._y}`;
//    return new Map([["x", this._x], ["y", this._y]]);
  }

  toString() {
      const isAliveStr = (this._isAlive === false) ? " LOST" : "";
      return `${this._x} ${this._y} ${this._orientation}${isAliveStr}`;
  }
  
  turn(orientation, direction) {
    var degree = cp.getDegree(orientation);

    if(direction.toUpperCase() == "R") {
        degree = (degree == 270) ? 0 : degree + 90; // when turning right make sure degree never becomes 360 since that value is not mapped
    }
    else if (direction.toUpperCase() == "L") {
        degree = (degree == 0) ? 270 : degree - 90; // when turning left make sure degree never becomes 360 since that value is not mapped
    }

    this._orientation = cp.getPointName(degree); // orientation is defined in cardinal points so lets go back to that instead of degrees
  };
  
  move(posStr) {
    let hs = _hasScent.get(this);
    hs(posStr, "", "");
  }
}