/*
 * Cardinal Points Object 
 */
const _points = new WeakMap();
export default class CardinalPoints {
  constructor() {
    // Private data via WeakMaps
    _points.set(this, new Map([["N", 0], ["E", 90], ["S", 180], ["W", 270]]))
  }
  
  getDegree(point) {
    const points = _points.get(this);
    return points.get(point.toString());
  }
    
  getPointName(degree) {
    const points = _points.get(this);
    for (const [key, value] of points) {
     if(value === Number.parseInt(degree, 10)) {
       return key;
     }
    }
  }
}