const connection = require('../mysqlconfiguration');
const util = require('util');

async function updateUser(request, response) {
  const user = request.params.id;
  const name = request.body.name;
  const email = request.body.email;
  const execQuery = util.promisify(connection.query.bind(connection));
  if (name) {
    var updateUserName = `UPDATE users SET name = "${name}" WHERE userID = ${user}`;
  }
  if (email) {
    var updateUserEmail = `UPDATE users SET email = "${email}" WHERE userID = ${user}`;
  }
  const updatedUser = `SELECT * FROM users WHERE userID = ${user}`;
  connection.connect();
  try {
    await execQuery(updateUserName);
    await execQuery(updateUserEmail);
    const update = await execQuery(updatedUser);
    response.json(update);
    console.log('The user is updated');
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

module.exports = updateUser;
