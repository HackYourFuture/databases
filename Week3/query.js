const dbConnection = require('./DBconnection');

async function showTables() {
  try {
    await dbConnection.execQuery('SHOW TABLES');
  } catch (error) {
    console.log(error);
  }
}


async function addUser(id, name) {
  try {
    await dbConnection.execQuery(`INSERT INTO users(id,name) values(?,?)`, [id, name]);
  } catch (error) {
    console.log(error);
  }
}

async function addTodo(id, user_id, title) {
  try {
    await dbConnection.execQuery(`INSERT INTO todos(id,user_id,title) values(?,?,?)`, [id, user_id, title]);
  } catch (error) {
    console.log(error);
  }
}

async function addItem(id, title, done) {
  try {
    await dbConnection.execQuery(`INSERT INTO items(id,title,done) values(?,?,?)`, [id, title, done]);
  } catch (error) {
    console.log(error);
  }
}

async function addReminder(id, item_id, date) {
  try {
    await dbConnection.execQuery(`INSERT INTO reminders(id,item_id,date) values(?,?,?)`, [id, item_id, date]);
  } catch (error) {
    console.log(error);
  }
}

async function deletTodo(id) {
  try {
    await dbConnection.execQuery(`DELETE FROM todos WHERE id=?`, [id])
  } catch (error) {
    console.log(error);
  }
}

async function deleteItem(id) {
  try {
    await dbConnection.execQuery(`DELETE FROM items WHERE id=?`, [id])
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  showTables: showTables(),
  addUser: addUser(),
  addTodo: addTodo(),
  addItem: addItem(),
  addReminder: addReminder(),
  deletTodo: deletTodo(),
  deleteItem: deleteItem(),
}