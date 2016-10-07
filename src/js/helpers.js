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

export const Cardinal = {
  points: new Map([["N", 0], ["E", 90], ["S", 180], ["W", 270]]), 
  pointName: function(degree) {
    for (const [key, value] of this.points) {
     if(value === Number.parseInt(degree, 10)) {
       return key;
     }
    }
  }
}