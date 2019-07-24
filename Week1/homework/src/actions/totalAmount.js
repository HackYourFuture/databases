const { printTitle, numberToText } = require('../helpers');
const { myQuery } = require('../sql/db');

module.exports.totalAmount = async (table, column, order = null, limit = null) => {
  let query = `SELECT ${column}, ${column} FROM ${table}`;
  if (order) {
    query += ` ORDER BY ${column} ${order}`;

    if (order.toLowerCase() === 'desc') printTitle(`The ${column} of ${limit} most populated ${table}`);

    if (order.toLowerCase() === 'asc') printTitle(`The ${column} of ${limit} least populated ${table}`);
  }

  if (limit) query += ` LIMIT ${limit}`;

  const list = await myQuery(query);

  if (limit === null || order === null) printTitle(`The ${column} of the world`);

  let arr = [];
  list.forEach(data => arr.push(data[column]));

  const totalPopulation = arr.reduce((a, b) => a + b, 0);

  if (typeof totalPopulation !== 'number') return console.log(`Column "${column}" doesn't consist only numbers!\nTotal characters: ${totalPopulation.length}`);

  console.log(numberToText(totalPopulation, 2));
};
