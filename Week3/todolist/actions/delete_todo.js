const connection = require('../mysqlconfiguration');
const util = require('util');

async function deleteTodo(request, response) {
  const todo = request.params.id;
  const execQuery = util.promisify(connection.query.bind(connection));
  const deleteTd = `DELETE FROM todos WHERE todoID = ${todo}`;
  const deleteFromCommonTable = `DELETE FROM todolists_todos WHERE todoID = ${todo}`;
  connection.connect();
  try {
    //first delete from common table then delete from original table. Otherwise foreign key restraint prevents deleting
    await execQuery(deleteFromCommonTable);
    await execQuery(deleteTd);
    response.send('The selected todo is deleted');
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

module.exports = deleteTodo;