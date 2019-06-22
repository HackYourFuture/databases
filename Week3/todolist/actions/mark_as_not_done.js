const connection = require('../mysqlconfiguration');
const util = require('util');

async function markAsNotDone(request, response) {
  const todo = request.params.id;
  const execQuery = util.promisify(connection.query.bind(connection));
  const markNotDone = `UPDATE todos
                    SET isCompleted = 0
                    WHERE todoID= ${todo}`;
  connection.connect();
  try {
    await execQuery(markNotDone);
    response.send('Selected todo is marked as not done');
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

module.exports = markAsNotDone;
