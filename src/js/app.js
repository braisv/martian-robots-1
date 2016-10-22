import { beingAsEmoji } from './helpers';
import { bounds } from './config';
import Martian from './martian';
import Robot from './martianRobot';
import { default as Store } from './store';
import { instruct } from './controller';

const vorpal = require('vorpal')();
const mars = new Store();

bounds.x = 5; bounds.y = 3;

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
