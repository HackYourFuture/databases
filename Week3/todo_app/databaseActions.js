'use strict';

const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todo_app',
});

const execQuery = util.promisify(connection.query.bind(connection));

function showUserLists(user) {
  return execQuery(
    'select users.id as "User ID", firstName as "User first name", lastName as "User last name", lists.name as "List Name", lists.id as "List ID", reminder as "List reminder" from users join lists on users.id = lists.user_id where users.id = ?',
    user,
  );
}

function showListItems(list) {
  return execQuery(
    'select users.id as "User ID", firstName as "User first name", lastName as "User last name", lists.id as "List ID", name as "List name", reminder as "List reminder", items.id as "To-do item ID", description as "To-do item description", completed as "Completed (true or false)" from users join lists on users.id = lists.user_id join items on lists.id = items.list_id where lists.id = ?',
    list,
  );
}

async function addUser(obj) {
  try {
    await execQuery('insert into users values (default, ?, ?)', [
      obj.user.firstName,
      obj.user.lastName,
    ]);
  } catch (err) {
    console.error(err);
  }
  return execQuery('SELECT * FROM users ORDER BY id DESC LIMIT 1');
}

async function addList(user, obj) {
  try {
    await execQuery('insert into lists values (default, ?, ?, default)', [obj.list.name, user]);
  } catch (err) {
    console.error(err);
  }
  return execQuery('SELECT * FROM lists ORDER BY id DESC LIMIT 1');
}
async function addItem(list, obj) {
  try {
    await execQuery('insert into items values (default, ?, ?, default)', [
      obj.item.description,
      list,
    ]);
  } catch (err) {
    console.error(err);
  }
  return execQuery('SELECT * FROM items ORDER BY id DESC LIMIT 1');
}

async function removeList(user, list) {
  try {
    await execQuery('delete from lists where id = ?', list);
  } catch (err) {
    console.error(err);
  }
  return execQuery('SELECT * FROM lists where user_id = ?', user);
}

async function removeItem(list, item) {
  try {
    await execQuery('delete from items where id = ?', item);
  } catch (err) {
    console.error(err);
  }
  return execQuery('SELECT * FROM items where list_id = ?', list);
}

async function markCompleted(item) {
  try {
    await execQuery('update items set completed = true where id = ?', item);
  } catch (err) {
    console.error(err);
  }
  return execQuery('SELECT * FROM items where id = ?', item);
}

async function resetTimer(list) {
  try {
    await execQuery('update lists set reminder = false where id = ?', list);
  } catch (err) {
    console.error(err);
  }
}

async function activateReminder(list, reminderTime) {
  try {
    await execQuery('update lists set reminder = true where id = ?', list);
    const listName = await execQuery('select name from lists where id = ?', list);
    setTimeout(() => {
      console.log(`Reminder!!! Check the List: ${listName[0].name}, id: ${list}`);
      resetTimer(list);
    }, reminderTime);
  } catch (err) {
    console.error(err);
  }
  return execQuery('SELECT * FROM lists where id = ?', list);
}

module.exports = {
  addUser,
  addList,
  addItem,
  removeList,
  removeItem,
  markCompleted,
  activateReminder,
  showUserLists,
  showListItems,
};
