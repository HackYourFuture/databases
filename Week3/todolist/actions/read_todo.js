const connection = require('../mysqlconfiguration');
const util = require('util');

async function readTodo(request, response) {
  const todo = request.params.id;
  const execQuery = util.promisify(connection.query.bind(connection));
  const readTodo = `SELECT * FROM Todos 
                    WHERE todoID = ${todo}`;
  connection.connect();
  try {
    const result = await execQuery(readTodo);
    response.json(result);
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

module.exports = readTodo;
