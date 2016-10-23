import { beingAsEmoji } from './helpers';
import { bounds, X_BOUNDS, Y_BOUNDS } from './config';
import Martian from './martian';
import Robot from './martianRobot';
import { default as Store } from './store';
import { instruct } from './controller';

const vorpal = require('vorpal')();

const mars = new Store();
let isBound = false;

// bounds.x = 5; bounds.y = 3;

function boundsPrompt(self, callback) {
  const boundary = [
    {
      type: 'input',
      name: 'x_axis',
      message: 'Enter x boundary: ',
      // when: (bounds.point.get('x') === undefined),
      validate: function( value ) {
        if (value.length) {
          // self.log(`1: ${value}`);
          return true;
        } else {
          return 'Enter x boundary: ';
        }
      }
    },
    {
      type: 'input',
      name: 'y_ayis',
      message: 'Enter y boundary: ',
      // when: (bounds.point.get('y') === undefined),
      validate: function( value ) {
        if (value.length) {
          // self.log(`2: ${value}`);
          return true;
        } else {
          return 'Enter y boundary: ';
        }
      }
    }
  ];

  self.prompt(boundary, callback);
}

vorpal
  .command('instruct <x> <y> <orientation> <instructions> [name]')
  .option('-m, --martian', 'Make a Martian, otherwise make a Robot.')
  .description('Make a Martian or a Robot and tell it what to do.')
  .action(function(args, callback) {
    const self = this;
    const name = (args.name) ? args.name : '';
    let tempMartian, newMartian;

    boundsPrompt(self, function(answers) {
      self.log(answers);
      const { x_axis, y_axis } = answers;
      bounds.x = x_axis; bounds.y = y_axis;
      self.log(bounds.point);

      if (args.options.martian) {
        tempMartian = new Martian(name, args.x, args.y, args.orientation);
      }
      else {
        tempMartian = new Robot(name, args.x, args.y, args.orientation);
      }

      newMartian = instruct(tempMartian, args.instructions);
      mars.add(newMartian);

      for (const [, value] of mars.getAll()) {
        self.log(`${value.toString()} => ${beingAsEmoji(value.toString(true))}`);
      }

      return callback;
    });

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
      self.log(`${value.toString()} => ${beingAsEmoji(value.toString(true))}`);
    }
    self.log(args);
    self.log(mars.getAll());

    callback();
  });

vorpal
  .delimiter('martians$')
  .show();
