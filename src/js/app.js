import { isNumber, isPositiveNumber } from './helpers';
import CardinalPoints from './cardinalPoints';

console.log(isNumber('2'));
console.log(isPositiveNumber('-2'));

const cp = new CardinalPoints();
console.log(cp.getDegree("E"));
console.log(cp.getPointName(270));
console.log(cp.points); 