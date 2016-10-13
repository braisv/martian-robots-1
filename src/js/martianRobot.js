import Martian from './martian';
import { isPositiveNumber, isPosSafe } from './helpers';
import { MAX_COORD, bounds } from './config';
import CardinalPoints from './cardinalPoints';
import { lostList } from './store.js';


const cp = new CardinalPoints();
const _processMotion = new WeakMap();
const _hasScent = new WeakMap();

/*
 * defines a martian robot and its current state
 * a martian robot will "fall off" the boundaries of mars
 * or be inhibted from falling off where another robot has fallen off
 */
export default class MartianRobot extends Martian {
  constructor(name, x, y, orientation, isAlive) {
    super(name, x, y, orientation, isAlive)
    
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
  
  type() {
    return "Robot";
  }
}