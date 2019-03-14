'use strict';

const printHelp = require('./printHelp');
const results = require('./results');
const command = process.argv[2];

switch (command) {
  case '1':
    results.one();
    break;
  case '2':
    results.two();
    break;
  case '3':
    results.three();
    break;
  case '4':
    results.four();
    break;
  case '5':
    results.five();
    break;
  case '6':
    results.six();
    break;
  case '7':
    results.seven();
    break;
  case '8':
    results.eight();
    break;
  case '9':
    results.nine();
    break;
  case '10':
    results.ten();
    break;
  case ('help', 'usage'):
  default:
    printHelp.printHelp();
    break;
}
