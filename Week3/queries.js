"use strict";
const db = require("./database.js");


module.exports = {
  createUser: async function (userId, user_name, user_last_name) {
    try {
      await db.execQuery(`INSERT INTO users(id, user_name, user_last_name) VALUES( ? , ? , ? )`, [userId, user_name, user_last_name]);
      console.log(userId, user_name, user_last_name);
    } catch (err) {
      console.error(err.message);
    }
  },

  createList: async function (userId, caption) {
    try {
      await db.execQuery(`INSERT INTO lists(user_id,caption) VALUES (?,?)`, [userId, caption]);
      console.log(caption, userId);
    } catch (err) {
      console.error(err.message);
    }
  },

  createItem: async function (listId, description) {
    try {
      await db.execQuery(`INSERT INTO items (list_id,description) VALUES (?,?)`, [listId, description]);
    } catch (err) {
      console.error(err.message);
      db.connection.end();
    }
  },
  createReminder: async function (listId, reminder) {
    try {
      await db.execQuery(`INSERT INTO reminders(list_id,reminder) VALUES (?,?) `, [listId, reminder]);
    } catch (err) {
      console.error(err.message);
      db.connection.end();
    }
  },

  updateItem: async function (listId) {
    try {
      await db.execQuery(`UPDATE items SET is_completed =? WHERE id = ?`, [1, listId]);
    } catch (err) {
      console.error(err.message);
      db.connection.end();
    }
  },
  deleteItem: async function (itemId) {
    try {
      await db.execQuery(
        `DELETE FROM items WHERE id =? `, [itemId]);
      console.log(itemId);
    } catch (err) {
      console.error(err.message);
    }
  },
  deleteList: async function (id) {
    try {
      await db.execQuery(`DELETE FROM lists WHERE id =? `, [id]);
      console.log(id);
    } catch (err) {
      console.error(err.message);
    }
  }

}