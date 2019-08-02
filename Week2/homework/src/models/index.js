const { execQuery } = require('../database/connection');
const { createTableObject } = require('./create-table-object');

const fs = require('fs');
const util = require('util');

const readPromise = util.promisify(fs.readFile);

const getData = async file => JSON.parse(await readPromise('./src/models/data/' + file + '.json', 'utf8'));

module.exports.data = async () => {
  const valuesOfCountries = await getData('countries');
  const valuesOfCities = await getData('cities');
  const valuesOfLanguages = await getData('languages');

  const titlesOfCountries = Array.from(await execQuery('describe countries')).map(column => ({ ...column }.Field));
  const titlesOfCities = Array.from(await execQuery('describe cities')).map(column => ({ ...column }.Field));
  const titlesOfLanguages = Array.from(await execQuery('describe languages')).map(column => ({ ...column }.Field));

  const countries = createTableObject(titlesOfCountries, valuesOfCountries);
  const cities = createTableObject(titlesOfCities, valuesOfCities);
  const languages = createTableObject(titlesOfLanguages, valuesOfLanguages);

  return { countries, cities, languages };
};
