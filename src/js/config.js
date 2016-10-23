/** module config */

import { isPositiveNumber } from './helpers';

/*
 * Default values
 */
export const MAX_COORD = 50;
export const MAX_INSTRUCTION = 100;
export const X_BOUNDS = 5;
export const Y_BOUNDS = 3;

/**
 * set boundaries for mars as object literal
 * and return a boundaries a map with our points
 */
let x, y;
export const bounds = {
  set x(value) {
    x = (isPositiveNumber(value) && value <= MAX_COORD) ? value : X_BOUNDS;
  },
  set y(value) {
    y = (isPositiveNumber(value) && value <= MAX_COORD) ? value : Y_BOUNDS;
  },
  get point() {
    return new Map([['x', x], ['y', y]]);
  }
};
