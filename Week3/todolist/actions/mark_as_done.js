const connection = require('../mysqlconfiguration');
const util = require('util');

async function markAsDone(request, response) {
  const todo = request.params.id;
  const execQuery = util.promisify(connection.query.bind(connection));
  const marking = `UPDATE todos SET isCompleted = 1 WHERE todoID = ${todo}`;
  const doneTodo = `SELECT * FROM todos WHERE todoID = ${todo}`;
  connection.connect();
  try {
    await execQuery(marking);
    const markedTodo = await execQuery(doneTodo);
    response.json(markedTodo);
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

module.exports = markAsDone;
