import vorpal from 'vorpal';
import { bounds, X_BOUNDS, Y_BOUNDS } from '../config';
import Martian from '../classes/martian';
import Robot from '../classes/martianRobot';
import { instruct, printMars } from '../controller';

const cli = vorpal();
const chalk = cli.chalk;

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
  const name = (args.name === undefined) ? '' : args.name;
  let tempMartian;

  if (bounds.x === undefined || bounds.y === undefined) {
    bounds.x = (args.options.xBounds) ? args.options.xBounds : X_BOUNDS;
    bounds.y = (args.options.yBounds) ? args.options.yBounds : Y_BOUNDS;
  }

  try {
    if (args.options.martian) {
      tempMartian = new Martian(name, args.x, args.y, args.orientation);
    }
    else {
      tempMartian = new Robot(name, args.x, args.y, args.orientation);
    }
  }
  catch (e) {
    self.log(e);
    self.log(chalk.red('You failed to make a martian/robot. Type `help instruct` to correct your instruction format.'));
  }

  try {
    mars.add(instruct(tempMartian, args.instructions));
  }
  catch (e) {
    self.log(e);
    self.log(chalk.red('Your instructions failed. Type `help instruct` to correct your instruction format.'));
  }

  self.log(printMars([...mars.getAll().values()]).string);

  callback();
}

module.exports = function(vorpal) {
  vorpal
    .command('instruct <x> <y> <orientation> <instructions> [name]')
    .description('Make a Martian or a Robot and tell it what to do. x, y bounds only need to be set once, and will be ignored if set again in this session. e.g.: `instruct -x 5 -y 3 1 1 E RFRFRFRF` or `instruct 1 1 E RFRFRFRF`')
    .option('-x [xBounds]', `Set x bounds > 0 && <= 50. Invalid entries default to ${X_BOUNDS}.`)
    .option('-y [yBounds]', `Set y bounds > 0 && <= 50. Invalid entries default to ${Y_BOUNDS}.`)
    .option('-m, --martian', 'Make a Martian, otherwise make a Robot.')
    .action(instructions);

  /*vorpal
    .catch('[words...]', 'Catches incorrect commands')
    .action(function (args, cb) {
      this.log(args.words.join(' ') + ' is not a valid command.');
      cb();
    });*/
};
