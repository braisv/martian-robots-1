/** @module Martian */

import { isPositiveNumber } from './helpers';
import { bounds } from './config';
import CardinalPoints from './cardinalPoints';

const cp = new CardinalPoints();

/**
 * defines a martian and its current state
 * a martian can move anywhere AFTER initialization
 */
export default class Martian {
  /**
   *
   * @param {string}   name        martian name: defaults to time string
   * @param {number} x           martian x coordinate: default to zero
   * @param {number} y           martian y coordinate: default to zero
   * @param {string}   orientation
   * martian orientation, must be a valid CardinalPoint or will default to north
   * @param {boolean} isAlive     martian status, defaults to true
   */
  constructor(name, x, y, orientation, isAlive) {
    this._name = (name.trim().length === 0) ? Date.now().toString() : `${name}-${Date.now()}`;
    this._x = (isPositiveNumber(x) && x <= bounds.point.get('x')) ? x : 0;
    this._y = (isPositiveNumber(y) && y <= bounds.point.get('y')) ? y : 0;
    this._orientation = (cp.isValidPoint(orientation)) ? orientation.toUpperCase() : 'N';
    this._isAlive = (typeof isAlive === 'boolean') ? isAlive : true;
  }

  get name() {
    return this._name;
  }

  set x(value) {
    this._x = value;
  }

  get x() {
    return this._x;
  }

  set y(value) {
    this._y = value;
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
    if (typeof value === 'boolean') {
      this._isAlive = value;
    }
    else {
//          this._isAlive = true;
      throw new Error('A robot can only be alive (true) or lost (false).');
    }
  }

  get isAlive() {
    return this._isAlive;
  }

  get point() {
    return `${this._x},${this._y}`;
  }

  /**
   *
   * @param   {boolean} withType = false; include object type or nah?
   * @returns {string} being string description
   */
  toString(withType = false) {
    const isAliveStr = (this._isAlive === false) ? ' LOST' : '';
    if (withType) {
      return `${this.type()} ${this._x} ${this._y} ${this._orientation}${isAliveStr}`;
    }
    return `${this._x} ${this._y} ${this._orientation}${isAliveStr}`;
  }

  /**
   *
   * @param {string} direction: sets new orientation based on L/R direction
   */
  turn(direction) {
    let degree = cp.getDegree(this._orientation);

    if (direction.toUpperCase() === 'R') {
      // when turning right make sure degree never becomes 360 since that value is not mapped
      degree = (degree === 270) ? 0 : degree + 90;
    }
    else if (direction.toUpperCase() === 'L') {
      // when turning left make sure degree never becomes 360 since that value is not mapped
      degree = (degree === 0) ? 270 : degree - 90;
    }

    // orientation is defined in cardinal points so lets go back to that instead of degrees
    this.orientation = cp.getPointName(degree);
  }

  /**
   * orientation determines which axis to increment/decrement along
   */
  move() {
    switch (this._orientation) {
      case 'N':
        this._y += 1;
        break;
      case 'S':
        this._y -= 1;
        break;
      case 'E':
        this._x += 1;
        break;
      case 'W':
        this._x -= 1;
        break;
      default:
        // do nothing
    }
  }

  static type() {
    return 'Martian';
  }
}
