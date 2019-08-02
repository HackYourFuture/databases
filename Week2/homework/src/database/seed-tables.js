const { execQuery } = require('./connection');
const { data } = require('../models/index');

const errorHandler = (error, index) => console.log(`${index}. item couldn't inserted.\n${error.message}`);

module.exports.seedTables = async () => {
  // Array datas for each table
  const { countries, cities, languages } = await data();

  const promisesCountry = countries.map(
    async (country, i) => await execQuery('INSERT INTO countries SET ?', country).catch(error => errorHandler(error, i))
  );

  const promisesCity = cities.map(
    async (city, i) => await execQuery('INSERT INTO cities SET ?', city).catch(error => errorHandler(error, i))
  );

  const promisesLanguage = languages.map(
    async (language, i) =>
      await execQuery('INSERT INTO languages SET ?', language).catch(error => errorHandler(error, i))
  );

  await Promise.all(promisesCountry);
  console.log(`${countries.length} countries inserted succesfully!`);

  await Promise.all(promisesCity);
  console.log(`${cities.length} cities inserted succesfully!`);

  await Promise.all(promisesLanguage);
  console.log(`${languages.length} languages inserted succesfully!`);
};
