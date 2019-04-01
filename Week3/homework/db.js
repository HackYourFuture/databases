const util = require('util');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const execQuery = util.promisify(connection.query.bind(connection));

const getAll = async function(id) {
  let sql = `select * from users a join toDosList b on a.Id = b.UserId join todoItems c on b.listId = c.listId where a.Id = ?`;
  try {
    return await execQuery(sql, [id]);
  } catch (error) {
    connection.end();
    return error;
  }
};
const createUser = async function(id, firstName, lastName) {
  let sql = `insert into Users (id,firstName,lastName) values (?,?,?)`;
  try {
    return await execQuery(sql, [id, firstName, lastName]);
  } catch (error) {
    connection.end();
    return error;
  }
};
const createList = async function(UserId, category, prioritize) {
  let sql = `insert into toDosList(UserId, category, prioritize) values (?,?,?)`;
  try {
    return await execQuery(sql, [UserId, category, prioritize]);
  } catch (error) {
    connection.end();
    return error;
  }
};
const createItem = async function(listId, todo, description, prioritize) {
  let sql = `insert into todoItems (listId, todo, description, prioritize) values (?,?,?,?)`;
  try {
    return await execQuery(sql, [listId, todo, description, prioritize]);
  } catch (error) {
    connection.end();
    return error;
  }
};
const deleteUser = async function(id) {
  let sql = `delete from users where id = ?`;
  try {
    return await execQuery(sql, [id]);
  } catch (error) {
    connection.end();
    return error;
  }
};
const deleteList = async function(listId) {
  let sql = `delete from toDosList where listId = ?`;
  try {
    return await execQuery(sql, [listId]);
  } catch (error) {
    connection.end();
    return error;
  }
};
const deleteItem = async function(itemId) {
  let sql = `delete from todoItems where itemId = ?`;
  try {
    return await execQuery(sql, [itemId]);
  } catch (error) {
    connection.end();
    return error;
  }
};
const setItemCompleted = async function(itemId) {
  let sql = `update todoItems set completed = "T" where itemId = ?`;
  try {
    return await execQuery(sql, [itemId]);
  } catch (error) {
    connection.end();
    return error;
  }
};
const updateList = async function(category, prioritize, listId) {
  let sql = `update toDosList set category = ? ,prioritize = ? where listId = ?`;
  try {
    return await execQuery(sql, [category, prioritize, listId]);
  } catch (error) {
    connection.end();
    return error;
  }
};
const updateItem = async function(todo, description, prioritize, listId) {
  let sql = `update TodoItems set todo = ? ,description = ? ,prioritize = ? where listId = ?`;
  try {
    return await execQuery(sql, [todo, description, prioritize, listId]);
  } catch (error) {
    connection.end();
    return error;
  }
};

module.exports = {
  getAll,
  createUser,
  createList,
  createItem,
  deleteUser,
  deleteList,
  deleteItem,
  setItemCompleted,
  updateList,
  updateItem,
};
