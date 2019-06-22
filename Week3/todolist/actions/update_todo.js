const connection = require('../mysqlconfiguration');
const util = require('util');
const readTodo = require('./read_todo');

async function updateTodo(request, response) {
  const todo = request.params.id;
  const name = request.body.name;
  const status = request.body.status;
  const date = request.body.date;
  const execQuery = util.promisify(connection.query.bind(connection));
  const updateTd = `
    UPDATE todos
    SET name = ${name}, isCompleted = ${status}, reminder = ${date}
    WHERE todoID = ${todo}`;
  const updatedTodo = `SELECT * FROM todos WHERE todoID = ${todo}`;
  connection.connect();
  try {
    await execQuery(updateTd);
    const update = await execQuery(updatedTodo);
    response.json(update);
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

module.exports = updateTodo;
