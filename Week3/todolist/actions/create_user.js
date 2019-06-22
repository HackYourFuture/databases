const connection = require('../mysqlconfiguration');
const util = require('util');

async function createUserAndCorrespondWithTodoLists(request, response) {
  const name = request.body.name;
  const email = request.body.email;
  const linkedTodoListsArray = request.body.todoLists;
  const execQuery = util.promisify(connection.query.bind(connection));
  const newUser = `INSERT INTO users (name, email)
                    VALUES (${name}, ${email})`;
  const newUserID = `SELECT userID FROM users ORDER BY userID DESC LIMIT 1`;
  connection.connect();
  try {
    await execQuery(newUser);
    const newID = await execQuery(newUserID);
    if (linkedTodoListsArray) {
      linkedTodoListsArray.forEach(async function(todoList) {
        const corresponder = `INSERT INTO users_todolists(userID, todolistID)
                              VALUES (${newID}, ${todoList})`;
        await execQuery(corresponder);
      });
    }
    response.send(
      `the user with the name ${name}, email ${email} created and connected with ${linkedTodoListsArray} lists`,
    );
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

module.exports = createUserAndCorrespondWithTodoLists;
