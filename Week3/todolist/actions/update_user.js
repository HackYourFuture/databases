const connection = require('../mysqlconfiguration');
const util = require('util');

async function updateUser(request, response) {
  const user = request.params.id;
  const name = request.body.name;
  const email = request.body.email;
  const execQuery = util.promisify(connection.query.bind(connection));
  const updateUsr = `UPDATE users
                  SET name = ${name}, email = ${email}
                  WHERE userID = ${user}`;
  const updatedUser = `SELECT * FROM users WHERE userID = ${user}`;
  connection.connect();
  try {
    await execQuery(updateUsr);
    const update = await execQuery(updatedUser);
    response.json(update);
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

module.exports = updateUser;
