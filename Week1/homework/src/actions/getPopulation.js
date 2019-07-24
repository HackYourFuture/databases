const { printTitle, numberToText } = require('../helpers');
const { myQuery } = require('../sql/db');

module.exports.getPopulation = async (table, name) => {
  const list = await myQuery(`SELECT name, population FROM ${table} WHERE name  = "${name}"`);

  printTitle(`Population of ${name}:`);
  console.table(list);
};
