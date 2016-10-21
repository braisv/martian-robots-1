import { beingAsEmoji } from './helpers';
import { bounds } from './config';
import Martian from './martian';
import Robot from './martianRobot';
import { default as Robots } from './store';
import { instruct } from './controller';

bounds.x = 5; bounds.y = 3;
console.log('Bounds');
console.log(bounds.point);

const a = new Robot('a', 1, 1, 'E', true);
const b = new Robot('b', 3, 2, 'N', true);
const c = new Robot('c', 0, 3, 'W', true);
const aM = new Martian('aM', 3, 2, 'N', true);

const bots = new Robots();
bots.add(a, b, c, aM);

console.log(bots.getAll());

let tempBot = instruct(bots.get(a.name), 'RFRFRFRF');
bots.update(tempBot);

tempBot = instruct(bots.get(b.name), 'FRRFLLFFRRFLL');
bots.update(tempBot);

tempBot = instruct(bots.get(c.name), 'LLFFFLFLFL');
bots.update(tempBot);

tempBot = instruct(bots.get(aM.name), 'FRRFLLFFRRFLLFFF');
bots.update(tempBot);

console.log(bots.getAll());

for (const [, value] of bots.getAll()) {
  console.log(`${value.toString()} => ${beingAsEmoji(value.toString(true))}`);
}

/*
sooo apparently destructuring doesn't
only work on object literals
*/
const { name, x, y, orientation, isAlive, type } = a;
console.log(type, name, x, y, orientation, isAlive);
const obj = {
  type, name, x, y, orientation, isAlive
};

console.log(a);
console.log(JSON.stringify(a));
console.log(JSON.stringify(obj));
