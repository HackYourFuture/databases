const connection = require('../mysqlconfiguration');
const util = require('util');

async function readAllTodos(response) {
  const execQuery = util.promisify(connection.query.bind(connection));
  const readAllTodo = 'SELECT * FROM Todos';
  connection.connect();
  try {
    const result = await execQuery(readAllTodo);
    response.json(result);
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

module.exports = readAllTodos;
