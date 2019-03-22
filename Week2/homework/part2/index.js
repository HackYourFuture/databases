'use strict';
const program = require('commander');
const queries = require('./queries');

const help = queries.help;
const addTrigger = queries.addTrigger;
const insertLanguage = queries.insertLanguage;

if (!process.argv[2]) {
  help();
} else {
  program
    .command('help')
    .description('to get help')
    .action(() => {
      help();
    });

  program
    .command('trigger')
    .description('to add trigger')
    .action(() => {
      addTrigger();
    });

  program
    .command('insert')
    .description('to insert new language')
    .action(() => {
      insertLanguage();
    });
}

//   'SELECT DISTINCT country.Name, COUNT(Language) AS numberOfLanguage FROM country INNER JOIN countrylanguage ON country.Code = countrylanguage.CountryCode group by Name;',
