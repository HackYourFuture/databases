const connection = require('../mysqlconfiguration');
const util = require('util');

async function markAsDone(request, response) {
  const todo = request.params.id;
  const execQuery = util.promisify(connection.query.bind(connection));
  const markDone = `UPDATE todos
                    SET isCompleted = 1
                    WHERE todoID= ${todo}`;
  connection.connect();
  try {
    await execQuery(markDone);
    response.send('Selected todo is marked as not done');
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

module.exports = markAsDone;
