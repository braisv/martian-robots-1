import { beingAsEmoji } from '../helpers';
import { bounds, X_BOUNDS, Y_BOUNDS } from '../config';
import Martian from '../martian';
import Robot from '../martianRobot';
import { instruct } from '../controller';

function demo(args, callback) {
  const self = this;
  const mars = global.mars;

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

  for (const value of mars.getAll().values()) {
    self.log(`${value.toString()} => ${beingAsEmoji(value.toString(true))}`);
  }

  callback();
}

module.exports = function(vorpal) {
  vorpal
    .command('demo')
    .description('Demo readme instructions.')
    .action(demo);
};
