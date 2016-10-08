import { isNumber, isPositiveNumber } from './helpers';
import CardinalPoints from './cardinalPoints';
import { MAX_COORD, MAX_INSTRUCTION, bounds } from './config.js'

console.log(isNumber('2'));
console.log(isPositiveNumber('-2'));

const cp = new CardinalPoints();
console.log(cp.getDegree("E"));
console.log(cp.getPointName(270));
console.log(cp.points); 

console.log(`x: ${bounds.point.get("x")}`);
bounds.x = -10;
console.log(`x: ${bounds.point.get("x")}`);
bounds.y = 6;
console.log(`y: ${bounds.point.get("y")}`);
console.log(bounds.point);
console.log(bounds);