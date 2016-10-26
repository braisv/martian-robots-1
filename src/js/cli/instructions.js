import { bounds, X_BOUNDS, Y_BOUNDS } from '../config';
import Martian from '../classes/martian';
import Robot from '../classes/martianRobot';
import { instruct, printMars } from '../controller';

/**
 *
 * Action execution function of 'instruct' command
 * Example:
 * Set bounds on first run with -x -y: `instruct -x 6 -y 5 1 1 E RFRFRFRF`
 * Or use default bounds: `instruct 3 2 N FRRFLLFFRRFLL`
 *
 * @param {object} args
 * @param {function} callback
 * https://github.com/dthree/vorpal/wiki/API-%7C-vorpal.command#commandactionfunction
 */
function instructions(args, callback) {
  const self = this;
  const mars = global.mars;
  const name = (args.name) ? args.name : '';
  let tempMartian;

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

  mars.add(instruct(tempMartian, args.instructions));

  self.log(printMars([...mars.getAll().values()]).string);

  callback();
}

module.exports = function(vorpal) {
  vorpal
    .command('instruct <x> <y> <orientation> <instructions> [name]')
    .description('Make a Martian or a Robot and tell it what to do. x, y bounds only need to be set once, and will be ignored if set again in this session.')
    .option('-x [xBounds]', `Set x bounds > 0 && <= 50. Invalid entries default to ${X_BOUNDS}.`)
    .option('-y [yBounds]', `Set y bounds > 0 && <= 50. Invalid entries default to ${Y_BOUNDS}.`)
    .option('-m, --martian', 'Make a Martian, otherwise make a Robot.')
    .action(instructions);
};
