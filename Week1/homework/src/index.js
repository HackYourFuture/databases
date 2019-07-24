const { containsText, greaterThan, between, onContinent, orderByColumn, citiesOfCountry, getPopulation, totalAmount } = require('./actions');

const { connection } = require('./sql/db');

const { createTables } = require('./sql/create-tables');
const { seedTables } = require('./sql/seed-tables');

const commander = require('commander');

commander.description(`
Place : countries or cities

Assignment Test Functions:
--------------------------
  1. greater countries 8000000
  2. contains countries land
  3. between cities 500000 1000000
  4. continent europe
  5. orderBy countries surface_area desc

Optional Test Functions:
------------------------
  1. cities netherland
  2. population cities rotterdam
  3. orderBy countries surface_area desc 10
  4. orderBy cities population desc 10
  5. total countries population
`);

commander.command('help').action(() => commander.help());

commander.command('greater <place> <population>').action((place, population) => greaterThan(place, population));

commander.command('contains <place> <text>').action((place, text) => containsText(place, text));

commander.command('between <place> <min> <max>').action((place, min, max) => between(place, min, max));

commander.command('continent <continent_name>').action(continent => onContinent(continent));

commander.command('orderBy <place> <column> <order> [limit ...]').action((place, column, order, limit) => orderByColumn(place, column, order, limit));

commander.command('cities <country_name>').action(country => citiesOfCountry(country));

commander.command('population <place> <place_name>').action((place, name) => getPopulation(place, name));

commander.command('total <place> <column>').action((place, column) => totalAmount(place, column));

commander.option('-c, --create', 'create tables', createTables).option('-s, --seed', 'seed tables', seedTables);

commander.parse(process.argv);

if (!process.argv.includes('-c') & !process.argv.includes('--create') & !process.argv.includes('-s') & !process.argv.includes('-seed')) {
  connection.end();
}
