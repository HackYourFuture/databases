const connection = require('../mysqlconfiguration');
const util = require('util');

const execQuery = util.promisify(connection.query.bind(connection));

async function createTodo(request, response) {
  const name = request.body.name;
  const status = request.body.isCompleted;
  const date = request.body.date;
  const linkedLists = request.body.todolists;
  const newTodo = `INSERT INTO todos (name, isCompleted, reminder) VALUES ("${name}", ${status}, ${date})`;
  const newTodoID = `SELECT todoId FROM todos ORDER BY todoID DESC LIMIT 1`;
  connection.connect();
  try {
    await execQuery(newTodo);
    const newID = await execQuery(newTodoID);
    const tdID = newID[0].todoId;
    if (linkedLists) {
      const listsArray = linkedLists.split(',').map(Number);
      listsArray.forEach(async function(list) {
        const insertIntoCommonList = `INSERT INTO todolists_todos(todolistID, todoID) VALUES("${list}", "${tdID}")`;
        await execQuery(insertIntoCommonList);
      });
    }
    const readTodo = `SELECT * FROM todos WHERE todoID = ${tdID}`;
    const result = await execQuery(readTodo);
    response.json(result);
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

module.exports = createTodo;
