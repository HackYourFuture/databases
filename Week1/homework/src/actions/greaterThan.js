const { printTitle, numberToText } = require('../helpers');
const { myQuery } = require('../sql/db');

module.exports.greaterThan = async (table, amount) => {
  const list = await myQuery(`SELECT name, population FROM ${table} WHERE population > ${amount}`);

  printTitle(`${table} with population greater than ${numberToText(amount)}:`);
  console.table(list);
};
