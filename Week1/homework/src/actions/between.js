const { printTitle, numberToText } = require('../helpers');
const { myQuery } = require('../sql/db');

module.exports.between = async (table, min, max) => {
  const list = await myQuery(`SELECT name AS Name, population AS Population  FROM ${table} WHERE population BETWEEN ${min} AND ${max}`);

  printTitle(`${table} with population between ${numberToText(min)} AND ${numberToText(max)}:`);

  console.table(list);
};
