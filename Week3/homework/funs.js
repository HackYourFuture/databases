'use strict';

// DB CONNECTION ------------------------------------
const config = require('./connections/config');
const util = require('util');
const execQuery = util.promisify(config.query.bind(config));
const uuid = require('uuid/v4');

// FUNCTIONS
// ADD USER ------------------------------------
async function add_user(user_name) {
  try {
    await execQuery(`INSERT INTO users VALUES(?, ?);`, [uuid(), user_name]);
    console.log(`new user 's been added...\n`);
  } catch (error) {
    console.log(error);
  }
  return execQuery('SELECT * FROM users WHERE user_name = ?;', user_name);
}

// ADD LIST ------------------------------------
async function add_list(user_id, new_list) {
  try {
    await execQuery(`INSERT INTO lists VALUES(?, ?, ?);`, [uuid(), new_list, user_id]);
    console.log(`new list 's been added...\n`);
  } catch (error) {
    console.log(error.message);
  }
  return execQuery('SELECT * from lists WHERE list_name = ?;', new_list);
}

// ADD TODO ------------------------------------
async function add_todo(list_id, new_todo, deadline) {
  try {
    await execQuery('INSERT INTO todos VALUES(?, ?, ?, ?, ?);', [
      list_id,
      uuid(),
      new_todo,
      `F`,
      deadline,
    ]);
    console.log(`new todo 's been added...\n`);
  } catch (error) {
    console.log(error);
  }
  return execQuery('SELECT * FROM todos WHERE todo = ?;', new_todo);
}

// DELETE USER ------------------------------------
async function delete_user(user_id) {
  try {
    await execQuery('DELETE FROM users WHERE user_id = ?;', user_id);
    console.log(`The user with the ID: ${user_id} 's been deleted...`);
  } catch (error) {
    console.log(error.message);
  }
  return `The user with the ID: ${user_id} 's been deleted...`;
}

// DELETE LIST ------------------------------------
async function delete_list(list_id) {
  try {
    await execQuery('DELETE FROM lists WHERE list_id = ?;', list_id);
    console.log(`The list with the ID: ${list_id} 's been deleted...`);
  } catch (error) {
    console.log(error.message);
  }
  return `The list with the ID: ${list_id} 's been deleted...`;
}

// DELETE TODO ------------------------------------
async function delete_todo(todo_id) {
  try {
    await execQuery('DELETE FROM todos WHERE todo_id = ?;', todo_id);
    console.log(`The todo with the ID: ${todo_id} 's been deleted...`);
  } catch (error) {
    console.log(error.message);
  }
  return `The todo with the ID: ${todo_id} 's been deleted...`;
}

// TODO COMPLETED ------------------------------------
async function todo_completed(todo_id) {
  try {
    await execQuery(`UPDATE todos SET completed = 'T' WHERE todo_id = ?;`, todo_id);
    console.log(`The todo with the ID: ${todo_id} 's been completed...`);
  } catch (error) {
    console.log(error.message);
  }
  return `The todo with the ID: ${todo_id} 's been completed...`;
}

// ADD REMINDER ------------------------------------
async function add_reminder(list_id, new_reminder) {
  try {
    await execQuery('UPDATE lists SET reminder = ? WHERE list_id =?;', [new_reminder, list_id]);
    console.log(`The list with the ID: ${list_id} has a reminder at: ${new_reminder}.`);
  } catch (error) {
    console.log(error.message);
  }
  return `The list with the ID: ${list_id} has a reminder at: ${new_reminder}.`;
}

// EXPORT ------------------------------------
module.exports = {
  add_user,
  add_list,
  add_todo,
  delete_user,
  delete_list,
  delete_todo,
  todo_completed,
  add_reminder,
};
