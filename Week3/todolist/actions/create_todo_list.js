const connection = require('../mysqlconfiguration');
const util = require('util');

async function createTodoList(request, response) {
  const name = request.body.name;
  const description = request.body.description;
  const linkedTodosArray = request.body.todos;
  const linkedUsersArray = request.body.users;

  const execQuery = util.promisify(connection.query.bind(connection));

  const newList = `INSERT INTO todolists(name, description)
                  VALUES(${name}, ${description})`;
  const newListID = `SELECT todolistID FROM todolists ORDER BY todolistID DESC LIMIT 1`;
  connection.connect();
  try {
    await execQuery(newList);
    const newID = await execQuery(newListID);
    if (linkedUsersArray) {
      linkedUsersArray.forEach(async function(user) {
        const insertIntoCommonList = `INSERT INTO  users_todolists(userID, todolistID) 
                                VALUES(${user}, ${newID})`;
        await execQuery(insertIntoCommonList);
      });
    }
    if (linkedTodosArray) {
      linkedTodosArray.forEach(async function(todo) {
        const insertIntoOtherCommonList = `INSERT INTO  todolists_todos(todolistID, todoID) 
                                VALUES(${newID}, ${todo})`;
        await execQuery(insertIntoOtherCommonList);
      });
    }
    response.send(`The todolist with the name ${name} is created`);
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

module.exports = createTodoList;
