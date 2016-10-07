import { isNumber, isPositiveNumber, Cardinal } from './helpers';

console.log(isNumber('2'));
console.log(isPositiveNumber('-2'));
console.log(Cardinal.points.get("E"));
console.log(Cardinal.pointName(270));