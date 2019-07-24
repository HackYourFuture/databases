const { printTitle } = require('../helpers');
const { myQuery } = require('../sql/db');

module.exports.citiesOfCountry = async country => {
  const list = await myQuery(`SELECT cities.name AS 'City Name' FROM countries INNER JOIN cities ON cities.country_code = countries.code WHERE countries.name = "${country}"`);

  printTitle(`Names of all the cities of ${country}:`);
  console.table(list);
};
