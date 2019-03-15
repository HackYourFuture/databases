'use strict';

const command = process.argv.splice(2);
const queries = require('./queries');

switch (command[0]) {
  case '1':
    queries.one();
    break;

  case '2':
    queries.two();
    break;

  case '3':
    queries.three();
    break;

  case '4':
    queries.four();
    break;

  case '5':
    queries.five();
    break;

  case '6':
    queries.six();
    break;

  case '7':
    queries.seven();
    break;

  case '8':
    queries.eight();
    break;

  case '9':
    queries.nine();
    break;

  case '10':
    queries.ten();
    break;

  case 'help':
    queries.help();
    break;

  default:
    console.log(`This command doesn't exist, for help kindly type:
    node index.js help`);
}
