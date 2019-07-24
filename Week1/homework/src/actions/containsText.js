const { printTitle } = require('../helpers');
const { myQuery } = require('../sql/db');

module.exports.containsText = async (table, text) => {
  const list = await myQuery(`SELECT name FROM ${table} WHERE name LIKE "%${text}%"`);

  printTitle(`${table} which contain "${text}" in their names:`);
  console.table(list);
};
