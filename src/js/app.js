import vorpal from 'vorpal';
import { default as Store } from './store';

const cli = vorpal();
const chalk = cli.chalk;

global.mars = new Store();

cli
  .use(require('./cli/instructions.js'))
  .use(require('./cli/show.js'))
  .use(require('./cli/demo.js'))
  .use(require('./cli/test.js'))
  .delimiter(chalk.bgRed('martian-robots$'))
  .show();
