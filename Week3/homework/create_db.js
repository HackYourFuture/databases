'use strict';

const db = require('./db.js');
const createUser = async function(userId, userName) {
  try {
    await db.execQuery(`INSERT INTO users(userId, userName) VALUES (DEFAULT, ?)`, [
      userId,
      userName,
    ]);
  } catch (error) {
    console.log(error.message);
  }
};

const createList = async function(userId, listName) {
  try {
    await db.execQuery(`INSERT INTO lists (userId, listName) VALUES (?, ?)`, [userId, listName]);
  } catch (error) {
    console.log(error.message);
  }
};

const createItem = async function(listId, description) {
  try {
    await db.execQuery(`INSERT INTO items (listId, description) VALUES (?, ?)`, [
      listId,
      description,
    ]);
  } catch (error) {
    console.log(error.message);
  }
};

const createReminder = async function(listId, reminder) {
  try {
    await db.execQuery(`INSERT INTO reminders (listId, reminder) VALUES (?, ?)`, [
      listId,
      reminder,
    ]);
  } catch (error) {
    console.log(error.message);
  }
};

const updateItem = async function(itemId) {
  try {
    await db.execQuery(`UPDATE items SET isCompleted = ? WHERE id = ?`, [1, itemId]);
  } catch (err) {
    console.log(err.message);
  }
};

const deleteItem = async function(itemId) {
  try {
    await db.execQuery(`DELETE FROM items WHERE id = ?`, [itemId]);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteList = async function(listId) {
  try {
    await db.execQuery(`DELETE FROM lists WHERE id = ?`, [listId]);
    console.log(id);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createUser: createUser,
  createList: createList,
  createItem: createItem,
  createReminder: createReminder,
  updateItem: updateItem,
  deleteItem: deleteItem,
  deleteList: deleteList,
};
