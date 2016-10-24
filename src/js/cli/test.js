/* used to test stuff */

import { bounds, X_BOUNDS, Y_BOUNDS } from '../config';
import Martian from '../classes/martian';
import Robot from '../classes/martianRobot';
import { instruct, getMartians } from '../controller';

function test(args, callback) {
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

  const marsArr = [...mars.getAll().values()];
  self.log(`Martian\n${getMartians(marsArr, 'Martian')}`);
  self.log(`Robot\n${getMartians(marsArr, 'Robot')}`);
  self.log(`Lost\n${getMartians(marsArr, false, 'isAlive')}`);

  callback();
}

module.exports = function(vorpal) {
  vorpal
    .command('test')
    .description('Testing 1 3')
    .hidden()
    .action(test);
};
