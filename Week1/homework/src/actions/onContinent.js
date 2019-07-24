const { printTitle } = require('../helpers');
const { myQuery } = require('../sql/db');

module.exports.onContinent = async continent => {
  const list = await myQuery(`SELECT name FROM countries WHERE continent = "${continent}"`);

  printTitle(`Countries on the continent "${continent}"`);
  console.table(list);
};
