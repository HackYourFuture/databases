'use strict';
const functions = require('./queries');
const program = require('commander');

const help = functions.help;
const learnCapital = functions.learnCapital;
const learnSpokenLanguage = functions.learnSpokenLanguage;
const findCities = functions.findCities;
const findSimilarCountriesByOfficialLanguage = functions.findSimilarCountriesByOfficialLanguage;
const listContinents = functions.listContinents;
const makeAlert = functions.makeAlert;

const input = process.argv[2];

if (!input) {
  help();
} else if (input > 0 && input < 6) {
  program
    .command('help')
    .description('to get help')
    .action(() => {
      help();
    });

  program
    .command('1 <countryName>')
    .description('to learn the capital of a country')
    .action(countryName => {
      learnCapital(countryName);
    });

  program
    .command('2 <regionName>')
    .description('to list all the languages spoken in a specific region ')
    .action(regionName => {
      learnSpokenLanguage(regionName);
    });

  program
    .command('3 <languageName>')
    .description('to find the number of cities in which a specific language is spoken')
    .action(languageName => {
      findCities(languageName);
    });

  program
    .command('4 <regionName> <languageName>')
    .description('to list countries that have same official language in the same region')
    .action((regionName, languageName) => {
      findSimilarCountriesByOfficialLanguage(regionName, languageName);
    });

  program
    .command('5')
    .description('to list all the continents with the number of languages spoken in each continent')
    .action(() => {
      listContinents();
    });

  program.parse(process.argv);
} else {
  makeAlert();
}
