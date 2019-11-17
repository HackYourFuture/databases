'use strict';

const util = require('util');
const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todos',
});

pool.query = util.promisify(pool.query);

const userList = async (username, password) => {
  const query = 'select * from users where username=?';
  const answer = await pool.query(query, [username, password]);
  try {
    const answers = JSON.parse(JSON.stringify(answer));
    if (answers.length) {
      const userCheck = username === answers[0].username ? username : 'unregistered';
      const passCheck = password === answers[0].password ? password : 'not found';
      const name = answers[0].name;
      const id = answers[0].id;
      const registeredAt = answers[0].registered;
      return { userCheck, passCheck, name, id, registeredAt };
    }
    return 'not existing';
  } catch (error) {
    console.log(error.message);
  }
};

const insertUser = async (name, username, password) => {
  const query = 'insert into users set name=?, username=?, password=?';
  await pool.query(query, [name, username, password]);
};

const userID = async username => {
  const query = `select id from users where username=? `;
  const id = await pool.query(query, [username]);
  const userID = JSON.parse(JSON.stringify(id[0].id));
  return userID;
};

const createList = async (uid, description, reminderDate) => {
  const query = 'insert into lists set uid=?, description=?, reminder_date=?';
  await pool.query(query, [uid, description, reminderDate]);
};

const validateListID = async (uid, id) => {
  const query = `select id from lists where uid=? && id=?`;
  const answer = await pool.query(query, [uid, id]);
  const answers = JSON.parse(JSON.stringify(answer));
  return answers;
};

const deleteList = async (id, uid, description) => {
  const query = 'delete from lists where id=? && uid=? && description=?';
  await pool.query(query, [id, uid, description]);
};

const createItem = async (uid, lid, description) => {
  const query = `insert into items set uid=?, lid=?, description=?`;
  await pool.query(query, [uid, lid, description]);
};

const getItems = async id => {
  const query = `select items.id id, items.description item_description, items.status status, lists.id lid, lists.description list_description, lists.reminder_date remind_at from lists left join items on lists.id = items.id where items.uid=?`;
  const items = await pool.query(query, [id]);
  return items;
};

const deleteItem = async (id, lid, uid) => {
  const query = `delete from items where id=? and lid=? and uid=?`;
  await pool.query(query, [id, lid, uid]);
};

const complete = async (id, lid, uid) => {
  const query = `update items set status = 'completed' where id=? && lid=? && uid=?`;
  await pool.query(query, [id, lid, uid]);
};

module.exports = {
  userList,
  complete,
  deleteItem,
  getItems,
  createItem,
  deleteList,
  validateListID,
  createList,
  userID,
  insertUser,
};