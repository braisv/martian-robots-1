import { beingAsEmoji } from '../helpers';
import { getMartians } from '../controller';

const mars = global.mars;

function valShow() {
  if (mars.getAll().size === 0) {
    return 'There is nothing on Mars, please run `instruct` then try again.';
  }
  return true;
}

function show(args, callback) {
  const self = this;

  if (!args.options.l && !args.options.r && !args.options.m) {
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
}

module.exports = function(vorpal) {
  vorpal
    .command('show')
    .description('Show me who is on Mars.')
    .option('-l', 'Show me lost Robots.')
    .option('-r', 'Show me all Robots.')
    .option('-m', 'Show me all Martians.')
    .validate(valShow)
    .action(show);
};
