import { isPositiveNumber } from './helpers';

export const MAX_COORD = 50;
export const MAX_INSTRUCTION = 100;
const X_BOUNDS = 5, Y_BOUNDS = 3;

export const bounds = {};
let x, y;
Object.defineProperty(bounds, "x", {
    set: function(value) {
        x = (isPositiveNumber(value) && value <= MAX_COORD) ? value : X_BOUNDS;
    }
});

Object.defineProperty(bounds, "y", {
    set: function(value) {
        y = (isPositiveNumber(value) && value <= MAX_COORD) ? value : Y_BOUNDS;
    }
});


Object.defineProperty(bounds, "point", {
    get: function() {
      return new Map([["x", x], ["y", y]]);
    }
});