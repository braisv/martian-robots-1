import { beingAsEmoji } from './helpers';
import { bounds, X_BOUNDS, Y_BOUNDS } from './config';
import Martian from './martian';
import Robot from './martianRobot';
import { default as Store } from './store';
import { instruct, getMartians } from './controller';

const vorpal = require('vorpal')();

global.mars = new Store();

vorpal
  .command('show')
  .description('Show me who is on Mars.')
  .option('-l', 'Show me lost Robots.')
  .option('-r', 'Show me all Robots.')
  .option('-m', 'Show me all Martians.')
  .validate(function(args) {
    if(mars.getAll().size === 0) {
      return 'There is nothing on Mars, please run `instruct` then try again.';
    }
    else {
      return true;
    }
  })
  .action(function(args, callback) {
    const self = this;

    if(!args.options.l && !args.options.r && !args.options.m) {
      for (const value of mars.getAll().values()) {
        self.log(`${value.toString()} => ${beingAsEmoji(value.toString(true))}`);
      }
    }

    const marsArr = [...mars.getAll().values()];
    if (args.options.l) {
      self.log(getMartians(marsArr, false, 'isAlive'));
    }
    if (args.options.r) {
      self.log(getMartians(marsArr, 'Robot'));
    }
    if (args.options.m) {
      self.log(getMartians(marsArr, 'Martian'));
    }

    callback();
  });

vorpal
  .use(require('./cli/instructions.js'))
  .use(require('./cli/demo.js'))
  .use(require('./cli/test.js'))
  .delimiter('martian-robots$')
  .show();
