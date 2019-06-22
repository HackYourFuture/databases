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
  connection.connect();
  try {
    await execQuery(reminder);
    response.send(`the reminder is set for the todo ${todo} to the date ${date}`);
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

module.exports = setReminder;
