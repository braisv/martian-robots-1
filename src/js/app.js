import { isNumber, isPositiveNumber, toEmoji } from './helpers';
import CardinalPoints from './cardinalPoints';
import { MAX_COORD, MAX_INSTRUCTION, bounds } from './config.js';
import Robot from './robot';
import { default as Robots } from './store';
import { instructBot } from './controller';

bounds.x = 5; bounds.y = 3;
console.log(bounds.point);

const a = new Robot("a", 1, 1, "E", true);
const b = new Robot("b", 3, 2, "N", true);
const c = new Robot("c", 0, 3, "W", true);

let bots = new Robots();
bots.add(a);
bots.add(b);
bots.add(c);
console.log(bots.getAll());

let tempBot = instructBot(bots.get(a.name), "RFRFRFRF");
bots.update(tempBot);
//console.log(tempBot.toString());

tempBot = instructBot(bots.get(b.name), "FRRFLLFFRRFLL");
bots.update(tempBot);

tempBot = instructBot(bots.get(c.name), "LLFFFLFLFL");
bots.update(tempBot);

console.log(bots.getAll());

for(const [key, value] of bots.getAll()) {
  console.log(value.toString());
  console.log(toEmoji(value.toString()));
//  console.log(toEmoji(value));
}
//console.log(emoji.get("N"));