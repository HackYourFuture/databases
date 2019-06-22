const connection = require('../mysqlconfiguration');
const util = require('util');

async function updateTodoList(request, response) {
  const todolist = request.params.id;
  console.log(todolist);
  const name = request.body.name;
  const description = request.body.description;

  const execQuery = util.promisify(connection.query.bind(connection));
  const updateList = `
    UPDATE todolists
    SET name = ${name}, description = ${description}
    WHERE todolistID = ${todolist}`;
  const updatedTodolist = `SELECT * FROM todolists WHERE todolistID = ${todolist}`;
  connection.connect();
  try {
    await execQuery(updateList);
    const update = await execQuery(updatedTodolist);
    response.json(update);
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

module.exports = updateTodoList;
