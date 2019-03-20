'use strict';
const functions = require('./queries');
const program = require('commander');

const help = functions.help;
const learnCapital = functions.learnCapital;
const learnSpokenLanguage = functions.learnSpokenLanguage;
const findCities = functions.findCities;
const findSimilarCountriesByOfficialLanguage = functions.findSimilarCountriesByOfficialLanguage;
const findSimilarCitiesByRegion = functions.findSimilarCountriesByRegion;
const listContinents = functions.listContinents;

if (!process.argv[2]) {
  help();
} else if (String(process.argv[3]).substring(0, 1) === '-') {
  console.log('Please write a positive number!');
} else if (process.argv[2] > 0 && process.argv[2] < 6) {
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
    .description('to list all the languages spoken in a spesific region ')
    .action(regionName => {
      learnSpokenLanguage(regionName);
    });

  program
    .command('3 <languageName>')
    .description('to find the number of cities in which a spesific laguage is spoken')
    .action(languageName => {
      findCities(languageName);
    });

  program
    .command('4A')
    .description('to list countries that have same official language')
    .action(() => {
      findSimilarCountriesByOfficialLanguage();
    });

  program
    .command('4B')
    .description('to list countries that have same region')
    .action(() => {
      findSimilarCitiesByRegion();
    });

  program
    .command('5')
    .description('to list all the continents with the number of languages spoken in each continent')
    .action(() => {
      listContinents();
    });

  program.parse(process.argv);
} else {
  console.log('Please write a number between 1 and 5');
}
