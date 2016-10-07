import { isNumber, isPositiveNumber, Cardinal } from './helpers';

console.log(isNumber('2'));
console.log(isPositiveNumber('-2'));

const cp = new Cardinal();
console.log(cp.getDegree("E"));
console.log(cp.getPointName(270));
console.log(cp.points); 