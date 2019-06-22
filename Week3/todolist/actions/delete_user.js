const connection = require('../mysqlconfiguration');
const util = require('util');

async function deleteUser(request, response) {
  const user = request.params.id;
  const execQuery = util.promisify(connection.query.bind(connection));
  const userToBeDeleted = `DELETE FROM users WHERE userID = ${user}`;
  const deleteFromCommonTable = `DELETE FROM users_todolists WHERE userID = ${user}`;
  connection.connect();
  try {
    await execQuery(userToBeDeleted);
    await execQuery(deleteFromCommonTable);
    response.send('selected user is deleted');
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

module.exports = deleteUser;
