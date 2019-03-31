const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todo_lists',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const DROP_USERS_TABLE = `DROP TABLE IF EXISTS users`;
  const DROP_LISTS_TABLE = `DROP TABLE IF EXISTS lists`;
  const DROP_ITEMS_TABLE = `DROP TABLE IF EXISTS items`;

  const CREATE_DATABASE = `CREATE DATABASE IF NOT EXISTS todo_lists`;

  const CREATE_USERS_TABLE = `
  CREATE TABLE IF NOT EXISTS users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50)
  );`;

  const CREATE_LISTS_TABLE = `
  CREATE TABLE IF NOT EXISTS lists (
   list_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   list_name VARCHAR(50) NOT NULL,
   user_id INT NOT NULL,
   reminder BOOLEAN NOT NULL DEFAULT false,
   FOREIGN KEY (user_id) REFERENCES users(user_id)
  );`;

  const CREATE_ITEMS_TABLE = `
  CREATE TABLE IF NOT EXISTS items(
    item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    list_id INT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false,
    FOREIGN KEY (list_id) REFERENCES lists(list_id)
  );`;

  const users = [
    {
      user_id: 1,
      first_name: 'Yasser',
      last_name: 'KH',
    },
  ];
  const lists = [
    {
      list_id: 1,
      list_name: "Yasser's List",
      user_id: 1,
      reminder: false,
    },
  ];
  const items = [
    {
      item_id: 1,
      item_name: 'do-homework',
      list_id: 1,
      completed: false,
    },
  ];
  try {
    await execQuery(DROP_ITEMS_TABLE);
    await execQuery(DROP_LISTS_TABLE);
    await execQuery(DROP_USERS_TABLE);

    await execQuery(CREATE_DATABASE);

    await execQuery(CREATE_USERS_TABLE);
    await execQuery(CREATE_LISTS_TABLE);
    await execQuery(CREATE_ITEMS_TABLE);
    users.forEach(async user => {
      await execQuery('INSERT INTO users SET ?', user);
    });
    lists.forEach(async list => {
      await execQuery('INSERT INTO lists SET ?', list);
    });
    items.forEach(async item => {
      await execQuery('INSERT INTO items SET ?', item);
    });
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

seedDatabase();
