const connection = require('../mysqlconfiguration');
const util = require('util');

async function updateTodoList(request, response) {
  const todolist = request.params.id;
  const name = request.body.name;
  const description = request.body.description;

  const execQuery = util.promisify(connection.query.bind(connection));
  if (name) {
    var updateListName = `UPDATE todolists SET name = "${name}" WHERE todolistID = ${todolist}`;
  }
  if (description) {
    var updateListDescription = `UPDATE todolists SET description = "${description}" WHERE todolistID = ${todolist}`;
  }
  const updatedTodolist = `SELECT * FROM todolists WHERE todolistID = ${todolist}`;
  connection.connect();
  try {
    await execQuery(updateListName);
    await execQuery(updateListDescription);
    const update = await execQuery(updatedTodolist);
    console.log('The list is updated.');
    response.json(update);
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

module.exports = updateTodoList;
