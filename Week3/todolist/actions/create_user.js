const connection = require('../mysqlconfiguration');
const util = require('util');

async function createUserAndCorrespondWithTodoLists(request, response) {
  const execQuery = util.promisify(connection.query.bind(connection));

  const name = request.body.name;
  const email = request.body.email;
  const linkedLists = request.body.todolists;

  const newUser = `INSERT INTO users (name, email) VALUES ("${name}", "${email}")`;
  const newUserID = `SELECT userID FROM users ORDER BY userID DESC LIMIT 1`;

  connection.connect();
  try {
    await execQuery(newUser);
    const newID = await execQuery(newUserID);
    const usrID = newID[0]['userID'];
    if (linkedLists) {
      const listsArray = linkedLists.split(',').map(Number);
      console.log(listsArray);
      listsArray.forEach(async function(list) {
        const insertIntoCommonList = `INSERT INTO users_todolists(userID, todolistID) VALUES("${usrID}", "${list}")`;
        await execQuery(insertIntoCommonList);
      });
    }
    response.send(
      `the user with the name ${name}, email ${email} created and connected with given lists`,
    );
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

module.exports = createUserAndCorrespondWithTodoLists;
