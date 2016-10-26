import { searchMars } from '../controller';
import { printMars } from '../controller';

const mars = global.mars;


/**
 *
 * Validates `show` command before the action is fired.
 * If invalid, the command is not executed.
 *
 * @returns {string|boolean}
 * https://github.com/dthree/vorpal/wiki/api-%7C-vorpal.command#commandvalidatefunction
 */
function isMarsInhabited() {
  if (mars.getAll().size === 0) {
    return 'There is nothing on Mars, please run `instruct` then try again.';
  }
  return true;
}


/**
 *
 * Action execution function of `show` command
 * Not passing an option shows everything on mars
 *
 * @param {object} args
 * @param {function} callback
 * https://github.com/dthree/vorpal/wiki/API-%7C-vorpal.command#commandactionfunction
 */
function show(args, callback) {
  const self = this;


  /**
   * show everything on mars
   */
  if (!args.options.l && !args.options.r && !args.options.m) {
    self.log(printMars(mars.getAll().values()));
  }


  /**
   * show the right array based on options passed
   */
  if (args.options.l) {
    self.log(searchMars(mars.getAll().values(), false, 'isAlive').string);
  }
  if (args.options.r) {
    self.log(searchMars(mars.getAll().values(), 'Robot').string);
  }
  if (args.options.m) {
    self.log(searchMars(mars.getAll().values(), 'Martian').string);
  }

  callback();
}

module.exports = function(vorpal) {
  vorpal
    .command('show')
    .description('Show me who is on Mars.')
    .option('-l', 'Show me lost Robots.')
    .option('-r', 'Show me all Robots.')
    .option('-m', 'Show me all Martians.')
    .validate(isMarsInhabited)
    .action(show);
};
