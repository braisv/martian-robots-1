import { isNumber, isPositiveNumber } from './helpers';
import CardinalPoints from './cardinalPoints';
import { MAX_COORD, MAX_INSTRUCTION, bounds } from './config.js';
import Robot from './robot';
import { default as Robots } from './store';

console.log(isNumber('2'));
console.log(isPositiveNumber('-2'));

const cp = new CardinalPoints();
console.log(cp.getDegree("E"));
console.log(cp.getPointName(270));
console.log(cp.points); 

console.log(`x: ${bounds.point.get("x")}`);
bounds.x = 25;
console.log(`x: ${bounds.point.get("x")}`);
bounds.y = 25;
console.log(`y: ${bounds.point.get("y")}`);
console.log(bounds.point);
console.log(bounds);

const a = new Robot("a", 9, 15, "N", true);
const b = new Robot("b", 6, 12, "S", true);
const c = new Robot("c", 12, 18, "E", false);

let bots = new Robots();
bots.add(a);
bots.add(b);
bots.add(c);
console.log(bots.get(a.name));
a.turn("R");
a.move();
console.log(a.toString());
a.turn("L");
a.move();
console.log(a.toString());
a.turn("L");
a.move();
a.move();
bots.update(a);
console.log(a.toString());
console.log(bots.get(a.name));
console.log(bots.getAll());