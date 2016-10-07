export function isNumber(value) {
    if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
        return true;
    return false;
}

export function isPositiveNumber(value) {
    if (isNumber(value) && value > 0) 
        return true;
    return false;
}

/*
 * Cardinal Points Object 
 */
const _points = new WeakMap();
export class Cardinal {
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