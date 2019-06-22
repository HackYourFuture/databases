const { execQuery } = require('./execQuery');

async function checkId(table, id) {
  await execQuery(`use tododatabase`);
  const selectedRow = `select ID from ${table} where ID = ?`;
  return await execQuery(selectedRow, id);
}

module.exports.checkId = checkId;
