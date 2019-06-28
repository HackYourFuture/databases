const connection = require('../mysqlconfiguration');
const util = require('util');

async function markAsNotDone(request, response) {
  const todo = request.params.id;
  const execQuery = util.promisify(connection.query.bind(connection));
  const unmarking = `UPDATE todos SET isCompleted = 0 WHERE todoID = ${todo}`;
  const undoneTodo = `SELECT * FROM todos WHERE todoID = ${todo}`;
  connection.connect();
  try {
    await execQuery(unmarking);
    const unmarkedTodo = await execQuery(undoneTodo);
    response.json(unmarkedTodo);
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

module.exports = markAsNotDone;
