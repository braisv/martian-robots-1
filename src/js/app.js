import { default as Store } from './store';

const vorpal = require('vorpal')();

global.mars = new Store();

vorpal
  .use(require('./cli/instructions.js'))
  .use(require('./cli/show.js'))
  .use(require('./cli/demo.js'))
  .use(require('./cli/test.js'))
  .delimiter('martian-robots$')
  .show();
