import { beingAsEmoji } from '../helpers';
import { bounds, X_BOUNDS, Y_BOUNDS } from '../config';
import Martian from '../martian';
import Robot from '../martianRobot';
import { instruct } from '../controller';

function instructions(args, callback) {
  const self = this;
  const mars = global.mars;
  const name = (args.name) ? args.name : '';
  let tempMartian, newMartian;

  if (bounds.x === undefined || bounds.y === undefined) {
    bounds.x = (args.options.xBounds) ? args.options.xBounds : X_BOUNDS;
    bounds.y = (args.options.yBounds) ? args.options.yBounds : Y_BOUNDS;
  }

  if (args.options.martian) {
    tempMartian = new Martian(name, args.x, args.y, args.orientation);
  }
  else {
    tempMartian = new Robot(name, args.x, args.y, args.orientation);
  }

  newMartian = instruct(tempMartian, args.instructions);
  mars.add(newMartian);

  for (const value of mars.getAll().values()) {
    self.log(`${value.toString()} => ${beingAsEmoji(value.toString(true))}`);
  }

  callback();
}

module.exports = function(vorpal) {
  vorpal
    .command('instruct <x> <y> <orientation> <instructions> [name]')
    .option('-x [xBounds]', `Set x bounds > 0 && <= 50. Invalid entries default to ${X_BOUNDS}`)
    .option('-y [yBounds]', `Set y bounds > 0 && <= 50. Invalid entries default to ${Y_BOUNDS}`)
    .option('-m, --martian', 'Make a Martian, otherwise make a Robot.')
    .description('Make a Martian or a Robot and tell it what to do.')
    .action(instructions);
};
