import { isNumber, isPositiveNumber, beingAsEmoji } from './helpers';
import CardinalPoints from './cardinalPoints';
import { MAX_COORD, MAX_INSTRUCTION, bounds } from './config.js';
import Martian from './martian';
import Robot from './martianRobot';
import { default as Robots } from './store';
import { instruct } from './controller';
import { lostList } from './store.js';

bounds.x = 5; bounds.y = 3;
console.log("Bounds");
console.log(bounds.point);

const a = new Robot("a", 1, 1, "E", true);
const b = new Robot("b", 3, 2, "N", true);
const c = new Robot("c", 0, 3, "W", true);
const aM = new Martian("aM", 3, 2, "N", true);

let bots = new Robots();
bots.add(a, b, c, aM);

console.log(bots.getAll());

let tempBot = instruct(bots.get(a.name), "RFRFRFRF");
bots.update(tempBot);

tempBot = instruct(bots.get(b.name), "FRRFLLFFRRFLL");
bots.update(tempBot);

tempBot = instruct(bots.get(c.name), "LLFFFLFLFL");
bots.update(tempBot);

tempBot = instruct(bots.get(aM.name), "FRRFLLFFRRFLLFFF");
bots.update(tempBot);

console.log(bots.getAll());

for(const [key, value] of bots.getAll()) {
  console.log(`${value.toString()} => ${beingAsEmoji(value.toString(true))}`);
}