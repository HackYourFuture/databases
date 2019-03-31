'use strict';

const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todo_lists',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function addUser(newUser) {
  try {
    await execQuery('insert into users values (default, ?, ?)', [
      newUser.firstName,
      newUser.lastName,
    ]);
  } catch (error) {
    console.log(error);
  }
  return execQuery('SELECT * FROM users ORDER BY user_id DESC LIMIT 1');
}

async function addList(userId, lists) {
  try {
    await execQuery('insert into lists values (default, ?, ?, default)', [lists.listName, userId]);
  } catch (error) {
    console.log(error);
  }
  return execQuery('SELECT * FROM lists ORDER BY list_id DESC LIMIT 1');
}

async function addItem(listId, items) {
  try {
    await execQuery('insert into items values (default, ?, ?, default)', [items.item, listId]);
  } catch (error) {
    console.log(error);
  }
  return execQuery('SELECT * FROM items ORDER BY item_id DESC LIMIT 1');
}

async function markAsCompleted(itemId) {
  try {
    await execQuery('update items set completed = true where item_id = ?', itemId);
  } catch (error) {
    console.log(error);
  }
  return execQuery('SELECT * FROM items where item_id = ?', itemId);
}

async function addReminder(listId, time) {
  try {
    await execQuery('update lists set reminder = true where list_id = ?', listId);
    const listName = await execQuery('select list_name from lists where list_id = ?', listId);
    setTimeout(() => {
      console.log(`Check the List: ${listName[0].list_name}, list_id: ${listId}`);
      execQuery('update lists set reminder = false where list_id = ?', listId);
    }, time);
  } catch (error) {
    console.log(error);
  }
  return execQuery('SELECT * FROM lists where list_id = ?', listId);
}

async function deleteItem(itemId) {
  try {
    await execQuery('delete from items where item_id = ?', itemId);
  } catch (error) {
    console.log(error);
  }
}

async function deleteList(listId) {
  try {
    await execQuery('delete from lists where list_id = ?', listId);
  } catch (error) {
    console.log(error);
  }
}

async function displayUser(userId) {
  return execQuery(
    `select users.user_id, first_name, last_name, lists.list_id, list_name,
      reminder, item_id, item_name, completed
      from users join lists on users.user_id = lists.user_id
      join items on lists.list_id = items.list_id where users.user_id = ?`,
    userId
  );
}

module.exports = {
  addUser,
  addList,
  addItem,
  markAsCompleted,
  addReminder,
  deleteItem,
  deleteList,
  displayUser,
};
