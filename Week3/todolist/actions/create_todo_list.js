const connection = require('../mysqlconfiguration');
const util = require('util');

async function createTodoList(request, response) {
  const execQuery = util.promisify(connection.query.bind(connection));

  const name = request.body.name;
  const description = request.body.description;
  const linkedUsers = request.body.users;
  const linkedTodos = request.body.todos;

  const newList = `INSERT INTO todolists(name, description) VALUES("${name}", "${description}")`;
  const newListID = `SELECT todolistID FROM todolists ORDER BY todolistID DESC LIMIT 1`;
  connection.connect();
  try {
    await execQuery(newList);
    const newID = await execQuery(newListID);
    const listID = newID[0].todolistID;
    console.log(listID);
    if (linkedUsers) {
      const usersArray = linkedUsers.split(',').map(Number);
      usersArray.forEach(async function(user) {
        const insertIntoUserCommonList = `INSERT INTO users_todolists(userID, todolistID) VALUES("${user}", "${listID}")`;
        await execQuery(insertIntoUserCommonList);
      });
    }
    if (linkedTodos) {
      const TodosArray = linkedTodos.split(',').map(Number);
      TodosArray.forEach(async function(todo) {
        const insertIntoTodoCommonList = `INSERT INTO todolists_todos(todolistID, todoID) VALUES("${listID}", "${todo}")`;
        await execQuery(insertIntoTodoCommonList);
      });
    }
    response.send(`The todolist is created and bond with the given `);
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

module.exports = createTodoList;
