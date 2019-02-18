const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'todo',
});

async function createandinsert() {
  const CREATE_USER_TABLE = `
    CREATE TABLE  IF NOT EXISTS user (
                      id INT  PRIMARY KEY NOT NULL AUTO_INCREMENT, 
                      name  VARCHAR(50) NOT NULL, 
                      email VARCHAR(100)
              );`;

  const CREATE_TODO_LIST_TABLE = `
    CREATE TABLE  IF NOT EXISTS list(
                     id INT  PRIMARY KEY NOT NULL AUTO_INCREMENT , 
                     user_id INT, 
                     name VARCHAR(100) NOT NULL,

                     reminder_time DATE,
                     FOREIGN KEY(user_id)  REFERENCES user (id)
          );`;
  const CREATE_TODO_TASKS_TABLE = `
   CREATE TABLE  IF NOT EXISTS task(
                    id INT  PRIMARY KEY NOT NULL AUTO_INCREMENT , 
                    list_id INT, 
                    name VARCHAR(50) NOT NULL, due_date DATE, 
                    tag VARCHAR(50),
                    done ENUM('T','F'),
                    FOREIGN KEY(list_id) REFERENCES list (id)
         );`;
  const CREATE_REMINDERS_TABLE = `
  CREATE TABLE IF NOT EXISTS reminders(
                  id INT PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,
                  reminder DATETIME,
                  list_Id INT NOT NULL,
                  FOREIGN KEY(list_Id) REFERENCES list(id)
         );`;

  const execQuery = util.promisify(connection.query.bind(connection));
  connection.connect();
  try {
    await execQuery(CREATE_USER_TABLE);
    await execQuery(CREATE_TODO_LIST_TABLE);
    await execQuery(CREATE_TODO_TASKS_TABLE);
    await execQuery(CREATE_REMINDERS_TABLE);
  } catch (error) {
    console.log(error);
  }
  connection.end();
}
createandinsert();