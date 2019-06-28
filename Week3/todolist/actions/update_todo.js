const connection = require('../mysqlconfiguration');
const util = require('util');

async function updateTodo(request, response) {
  const todo = request.params.id;
  const name = request.body.name;
  const isCompleted = request.body.isCompleted;
  const date = request.body.date;
  const execQuery = util.promisify(connection.query.bind(connection));
  if (name) {
    var updateTodoName = `
      UPDATE todos
      SET name = "${name}"
      WHERE todoID = ${todo}`;
  }
  if (isCompleted) {
    var updateTodoStatus = `
      UPDATE todos
      SET isCompleted = "${isCompleted}"
      WHERE todoID = ${todo}`;
  }
  if (date) {
    var updateTodoDate = `
      UPDATE todos
      SET reminder = "${date}"
      WHERE todoID = ${todo}`;
  }
  const updatedTodo = `SELECT * FROM todos WHERE todoID = "${todo}"`;
  connection.connect();
  try {
    await execQuery(updateTodoName);
    await execQuery(updateTodoStatus);
    await execQuery(updateTodoDate);
    const update = await execQuery(updatedTodo);
    response.json(update);
    console.log('The todo is updated');
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

module.exports = updateTodo;
