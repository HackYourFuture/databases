const connection = require('../mysqlconfiguration');
const util = require('util');

async function setReminder(request, response) {
  const todo = request.params.id;
  const date = request.body.date;
  const execQuery = util.promisify(connection.query.bind(connection));
  const reminder = `
    UPDATE todos
    SET reminder = ${date}
    WHERE todoID= ${todo}`;
  const updatedTodo = `SELECT * FROM todos WHERE todoID = ${todo}`;
  connection.connect();
  try {
    await execQuery(reminder);
    const newTodo = await execQuery(updatedTodo);
    //I don't know why but it updates in database but sends the old data as a response
    response.json(newTodo);
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

module.exports = setReminder;
