const { printTitle, numberToText } = require('../helpers');
const { myQuery } = require('../sql/db');

module.exports.orderByColumn = async (table, column, order, limit = null) => {
  let query = `SELECT name, ${column} FROM ${table} ORDER BY ${column} ${order}`;
  let orderText = order === 'desc' ? 'descending' : 'ascending';
  if (limit) {
    query += ` LIMIT ${limit}`;
  }

  const list = await myQuery(query);

  printTitle(`${table} in the ${orderText} order of their ${column.split('_').join(' ')}:`);
  console.table(list);
};
