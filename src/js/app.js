import { beingAsEmoji } from './helpers';
import { bounds } from './config';
import Martian from './martian';
import Robot from './martianRobot';
import { default as Store } from './store';
import { instruct } from './controller';

const vorpal = require('vorpal')();

const mars = new Store();

bounds.x = 5; bounds.y = 3;

function boundsPrompt(self, axis) {
  self.prompt({
    type: 'input',
    name: axis,
    default: false,
    message: `${axis} Boundary? `,
    when() {
      const isBoundsSet = (bounds.point.get('x') === 0 && bounds.point.get('y') === 0);
      return isBoundsSet;
    },
  },
  (result) => {
    bounds[axis] = result[axis];
  });
}

vorpal
  .command('instruct <x> <y> <orientation> <instructions> [name]')
  .option('-m, --martian', 'Make a Martian, otherwise make a Robot.')
  .description('Make a Martian or a Robot and tell it what to do.')
  .action(function(args, callback) {
    const self = this;
    const name = (args.name) ? args.name : '';
    let tempMartian, newMartian;

    this.log(args);

    // boundsPrompt(self, 'x');
    // boundsPrompt(self, 'y');

    if (args.options.martian) {
      tempMartian = new Martian(name, args.x, args.y, args.orientation);
    }
    else {
      tempMartian = new Robot(name, args.x, args.y, args.orientation);
    }

    newMartian = instruct(tempMartian, args.instructions);
    mars.add(newMartian);

    for (const [, value] of mars.getAll()) {
      this.log(`${value.toString()} => ${beingAsEmoji(value.toString(true))}`);
    }

    callback();
  });

vorpal
  .command('make <x> <y> <orientation> [name]')
  .option('-m, --martian', 'Make a Martian, otherwise make a Robot.')
  .description('Make a Martian or a Robot.')
  .action(function(args, callback) {
    const self = this;

    if (args.options.martian) {
      mars.add(new Martian(args.name, args.x, args.y, args.orientation));
    }
    else {
      mars.add(new Robot(args.name, args.x, args.y, args.orientation));
    }

    for (const [, value] of mars.getAll()) {
      this.log(`${value.toString()} => ${beingAsEmoji(value.toString(true))}`);
    }
    this.log(args);
    this.log(mars.getAll());

    callback();
  });

vorpal
  .delimiter('martians$')
  .show();
