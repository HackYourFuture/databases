const connection = require('../mysqlconfiguration');
const util = require('util');

async function deleteTodoList(request, response) {
  const todolist = request.params.id;
  const execQuery = util.promisify(connection.query.bind(connection));
  const listToBeDeleted = `DELETE FROM todolists WHERE todolistID = ${todolist}`;
  const deleteFromUserCommonTable = `DELETE FROM users_todolists WHERE todolistID = ${todolist}`;
  const deleteFromTodoCommonTable = `DELETE FROM todolists_todos WHERE todolistID = ${todolist}`;
  connection.connect();
  try {
    await execQuery(listToBeDeleted);
    await execQuery(deleteFromUserCommonTable);
    await execQuery(deleteFromTodoCommonTable);
    response.send('selected list is deleted');
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

module.exports = deleteTodoList;
