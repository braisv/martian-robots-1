import { beingAsEmoji } from './helpers';
import { bounds, X_BOUNDS, Y_BOUNDS } from './config';
import Martian from './martian';
import Robot from './martianRobot';
import { default as Store } from './store';
import { instruct, printMars, getMartians } from './controller';

const vorpal = require('vorpal')();

const mars = new Store();

vorpal
  .command('instruct <x> <y> <orientation> <instructions> [name]')
  .option('-x [xBounds]', `Set x bounds > 0 && <= 50. Invalid entries default to ${X_BOUNDS}`)
  .option('-y [yBounds]', `Set y bounds > 0 && <= 50. Invalid entries default to ${Y_BOUNDS}`)
  .option('-m, --martian', 'Make a Martian, otherwise make a Robot.')
  .description('Make a Martian or a Robot and tell it what to do.')
  .action(function(args, callback) {
    const self = this;
    const name = (args.name) ? args.name : '';
    let tempMartian, newMartian;

    if(bounds.x === undefined || bounds.y === undefined) {
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
    this.log(...mars.getAll());

    callback();
  });

vorpal
  .command('test')
  .description('Testing 1 3')
  .action(function(args, callback) {
    bounds.x = X_BOUNDS;
    bounds.y = Y_BOUNDS;
    const a = new Robot('a', 1, 1, 'E');
    const b = new Robot('b', 3, 2, 'N');
    const c = new Robot('c', 0, 3, 'W');
    const aM = new Martian('aM', 3, 2, 'N');

    mars.add(instruct(a, 'RFRFRFRF'));
    mars.add(instruct(b, 'FRRFLLFFRRFLL'));
    mars.add(instruct(c, 'LLFFFLFLFL'));
    mars.add(instruct(aM, 'FRRFLLFFRRFLLFFF'));

    const marsArr = [...mars.getAll().values()];
    this.log(`Martian\n${getMartians(marsArr, 'Martian')}`);
    this.log(`Robot\n${getMartians(marsArr, 'Robot')}`);
    this.log(`Lost\n${getMartians(marsArr, false, 'isAlive')}`);

    callback();
  });

vorpal
  .delimiter('martians$')
  .show();
