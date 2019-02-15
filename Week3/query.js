const sql = require('./sql.js');

const showAll = async function() {
  try {
    await sql.execQuery(`SHOW TABLES`);
  } catch (error) {
    console.log(error.message, error.name, `the error come from the first function in query`);
  }
};

const createUser = async function(id, user_name) {
  try {
    await sql.execQuery(`INSERT INTO user(id,user_name) values(?,?)`, [id, user_name]);
  } catch (error) {
    console.log(error.message, `problem come from query`);
  }
};

const createTodo = async function(id, todos_name, user_id) {
  try {
    await sql.execQuery(`INSERT INTO todos(id,todos_name,user_id) values(?,?,?)`, [
      id,
      todos_name,
      user_id,
    ]);
  } catch (error) {
    console.log(error, `the error come from the second `);
  }
};

const createItem = async function(id, item_info, done, todos_id) {
  try {
    await sql.execQuery(`INSERT INTO items(id,item_info,done,todos_id) VALUES(?,?,?,?)`, [
      id,
      item_info,
      done,
      todos_id,
    ]);
  } catch (error) {
    console.log(error.name, error.message, `come from query.js third`);
  }
};

const createReminder = async function(id, time_reminder, todos_id) {
  try {
    await sql.execQuery(`INSERT INTO reminder(id,time_reminder,todos_id) VALUES(?,?,?)`, [
      id,
      time_reminder,
      todos_id,
    ]);
  } catch (error) {
    console.log(error.name, error.message, `come from query.js forth`);
  }
};

const updateItem = async function(item_id) {
  try {
    await sql.execQuery(`UPDATE items SET done=? where id=?`, [1, item_id]);
  } catch (error) {
    console.log(error.name, error.message, `come from query.js fifth`);
  }
};

const deleteItem = async function(item_id) {
  try {
    await sql.execQuery(`DELETE FROM items where id=?`, [item_id]);
  } catch (error) {
    console.log(error.name, error.message, `come from query.js sixth`);
  }
};

const deleteTodos = async function(todos_id) {
  try {
    await sql.execQuery(`DELETE FROM todos WHERE id=?`, [todos_id]);
  } catch (error) {
    console.log(error.name, error.message, `come from query.js seventh`);
  }
};
module.exports = {
  showAll: showAll,
  createUser: createUser,
  createTodo: createTodo,
  createItem: createItem,
  createReminder: createReminder,
  updateItem: updateItem,
  deleteItem: deleteItem,
  deleteTodos: deleteTodos,
};
