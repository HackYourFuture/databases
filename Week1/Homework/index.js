'use strict';

const command = process.argv.splice(2);
const queries = require('./queries');
const help = require('./help');

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

  case 'help':
  default:
    help();
    break;
}
