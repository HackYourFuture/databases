'use strict';

const CREATE_USER = `INSERT INTO users VALUES (
  NULL,
  ?,
  ?
)`;

const DELETE_USER = `DELETE FROM users WHERE id = ?`;

const SELECT_USERS = `SELECT * FROM users`;

const SELECT_USER = `SELECT * FROM users WHERE id = ?`;

const CREATE_LIST = `INSERT INTO todo_lists VALUES (
  NULL,
  ?,
  ?,
  ?,
  ?,
  NULL
)`;

const DELETE_LIST = `DELETE FROM todo_lists WHERE list_id = ?`;

const SELECT_LISTS = `SELECT * FROM todo_lists`;

const SELECT_LIST = `SELECT * FROM todo_lists WHERE list_id = ?`;

const CREATE_ITEM = `INSERT INTO todo_items VALUES (
  NULL,
  ?
)`;

const DELETE_ITEM = `DELETE FROM todo_items WHERE item_id = ?`;

const SELECT_ITEMS = `SELECT * FROM todo_items`;

const SELECT_ITEM = `SELECT * FROM todo_items WHERE item_id = ?`;

const CREATE_REMINDER = `INSERT INTO reminders VALUES (
  NULL,
  ?,
  ?
)`;

const DELETE_REMINDER = `DELETE FROM reminders WHERE id = ?`;

const SELECT_REMINDERS = `SELECT * FROM reminders`;

const SELECT_REMINDER = `SELECT * FROM reminders WHERE id = ?`;

const SET_REMINDER = `UPDATE todo_lists SET reminder = ? WHERE list_id = ?`;

const MARK_ITEM_AS_DONE = `INSERT INTO completed_todos VALUES (
  ?,
  ?
)`;

const MARK_LIST_AS_DONE = `UPDATE todo_lists SET done = 'T' WHERE list_id = ?`;

const MARK_LIST_AS_NOT_DONE = `UPDATE todo_lists SET done = 'F' WHERE list_id = ?`;

const MARK_ITEM_AS_NOT_DONE = `DELETE FROM completed_todos WHERE list_id = ? AND item_id = ?`;

const ADD_ITEM_TO_LIST = `INSERT INTO items_in_lists VALUES (
  ?,
  ?
)`;

const DELETE_ITEM_FROM_LIST = `DELETE FROM items_in_lists WHERE list_id = ? AND item_id = ?`;

const SELECT_ITEMS_IN_LISTS = `SELECT l.list_id, l.name AS 'List Name',
  l.description, l.created, l.done, l.reminder, i.item_id,
  i.todo_text AS Todo 
  FROM todo_lists AS l 
  INNER JOIN items_in_lists AS q 
    ON q.list_id = l.list_id 
  INNER JOIN todo_items AS i 
    ON q.item_id = i.item_id
  ORDER BY l.list_id`;

const SELECT_DONE_LISTS = `SELECT * FROM todo_lists WHERE done = 'T'`;

const SELECT_DONE_ITEMS = `SELECT l.list_id, l.name AS 'List Name', 
  i.item_id, i.todo_text AS Todo, 'ToDo is done' AS done 
  FROM todo_lists AS l 
  INNER JOIN completed_todos AS c 
    ON c.list_id = l.list_id 
  INNER JOIN todo_items AS i
    ON c.item_id = i.item_id
  ORDER BY l.list_id`;

const SELECT_USER_LISTS = `SELECT u.id, u.user_name, l.list_id,
  l.name AS 'List Name', l.description, l.created, l.done AS 'Completed?',
  l.reminder
  FROM users AS u
  INNER JOIN user_lists AS ul
    ON u.id = ul.user_id
  INNER JOIN todo_lists AS l
    ON ul.list_id = l.list_id
  ORDER BY u.id`;

const ASSOCIATE_LIST_WITH_USER = `INSERT INTO user_lists VALUES (?, ?)`;

const DELETE_LIST_FROM_USER = `DELETE FROM user_lists WHERE user_id = ? AND list_id = ?`;

module.exports = {
  CREATE_USER,
  CREATE_LIST,
  CREATE_ITEM,
  CREATE_REMINDER,
  DELETE_USER,
  DELETE_LIST,
  DELETE_ITEM,
  DELETE_REMINDER,
  SELECT_USERS,
  SELECT_USER,
  SELECT_LISTS,
  SELECT_LIST,
  SELECT_ITEMS,
  SELECT_ITEM,
  SELECT_REMINDERS,
  SELECT_REMINDER,
  SET_REMINDER,
  ADD_ITEM_TO_LIST,
  MARK_LIST_AS_DONE,
  MARK_ITEM_AS_DONE,
  MARK_LIST_AS_NOT_DONE,
  MARK_ITEM_AS_NOT_DONE,
  DELETE_ITEM_FROM_LIST,
  SELECT_ITEMS_IN_LISTS,
  SELECT_DONE_LISTS,
  SELECT_DONE_ITEMS,
  SELECT_USER_LISTS,
  ASSOCIATE_LIST_WITH_USER,
  DELETE_LIST_FROM_USER,
};
