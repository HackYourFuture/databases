'use strict';
const express = require('express');
const mysql = require('mysql');
const util = require('util');
const app = new express();
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todo',
});

const execQuery = util.promisify(connection.query.bind(connection));

function createQuery(args) {
  let sql = args[0];
  const inserts = args.slice(1);
  sql = mysql.format(sql, inserts);
  return sql;
}

async function idToValue(idColumn, table, nameColumn, value) {
  const sql = `SELECT ${idColumn} FROM ${table} WHERE ${nameColumn} = ?`;
  const query = await createQuery([sql, value]);
  const object = await execQuery(query);
  if (object.length == 0) {
    return '';
  } else {
    const result = Object.keys(object[0]).map(key => {
      return object[0][key];
    });

    return result[0];
  }
}

app.use((request, response, next) => {
  express.json()(request, response, error => {
    if (error) {
      return response.status(400).send('please send JSON in correct format');
    }
    next();
  });
});
app.get('/todo/', async (request, response) => {
  try {
    const { user_name } = request.body;

    const idValue = await idToValue('user_id', 'user', 'user_name', user_name);

    if (idValue == '') {
      response.status(400).send('user name does not exist');
    } else {
      const sql = await createQuery([
        'SELECT todo_desc, is_done from todo_item where user_id = ?',
        idValue,
      ]);

      const result = await execQuery(sql);

      response.send(result);
    }
  } catch (error) {
    response.status(400).send('something went wrong');
    console.log(error);
  }
});

app.post('/users/', async (request, response) => {
  try {
    const { user_name } = request.body;
    const checkSql = createQuery([`SELECT user_name FROM user WHERE user_name = ?`, user_name]);
    const checkResult = await execQuery(checkSql);
    if (checkResult.length !== 0) {
      response.send('user name already exists. try another');
    } else {
      const sql = createQuery(['INSERT INTO `user` VALUES (null,?)', user_name]);
      await execQuery(sql);
      response.send(201, 'user added successfully');
    }
  } catch (error) {
    console.error(error);
    response.status(400).send('something went wrong');
  }
});

app.post('/todo_list/', async (request, response) => {
  try {
    const { list_name, user_name, reminder } = request.body;
    console.log(list_name, user_name, reminder);
    const idValue = await idToValue('user_id', 'user', 'user_name', user_name);
    if (idValue == '') {
      response.status(400).send('user name does not exist');
    } else {
      const checkSql = createQuery([
        `SELECT list_name FROM todo_list WHERE list_name = ? AND user_id = ?`,
        list_name,
        idValue,
      ]);
      const checkResult = await execQuery(checkSql);
      if (checkResult.length !== 0) {
        response.send('this list already exists. try another');
      } else {
        const sql = await createQuery([
          'INSERT INTO `todo_list` VALUES (null,?,?,?)',
          list_name,
          idValue,
          reminder,
        ]);
        await execQuery(sql);
        response.send(201, 'list added successfully');
      }
    }
  } catch (error) {
    console.error(error);
    response.status(400).send('something went wrong');
  }
});

app.post('/todo/', async (request, response) => {
  try {
    const { todo_desc, list_name, user_name } = request.body;
    const listIdValue = await idToValue('list_id', 'todo_list', 'list_name', list_name);
    const userIdValue = await idToValue('user_id', 'user', 'user_name', user_name);
    if (listIdValue == '' || userIdValue == '') {
      response.status(400).send('user name or list name does not exist');
    } else {
      const sql = createQuery([
        'INSERT INTO `todo_item` VALUES (null,?,0,?,?)',
        todo_desc,
        listIdValue,
        userIdValue,
      ]);
      await execQuery(sql);
      response.send(201, 'item added successfully');
    }
  } catch (error) {
    console.error(error);
    response.status(400)('something went wrong');
  }
});

app.delete('/todo/:user_name/:list_name', async (request, response) => {
  try {
    const user_name = request.params.user_name;
    const list_name = request.params.list_name;
    const { todo_desc } = request.body;
    const userIdValue = await idToValue('user_id', 'user', 'user_name', user_name);
    const listIdValue = await idToValue('list_id', 'todo_list', 'list_name', list_name);
    if (listIdValue == '' || userIdValue == '') {
      response.status(400).send('user name or list name does not exist');
    } else {
      const sql = createQuery([
        'DELETE FROM todo_item WHERE user_id = ? AND list_id = ? AND todo_desc = ?',
        userIdValue,
        listIdValue,
        todo_desc,
      ]);

      await execQuery(sql);
      response.send(200, 'item deleted successfully');
    }
  } catch (error) {
    console.error(error);
    response.status(400).send('something went wrong');
  }
});

app.delete('/todo_list/:user_name/:list_name', async (request, response) => {
  try {
    const user_name = request.params.user_name;
    const list_name = request.params.list_name;
    const userIdValue = await idToValue('user_id', 'user', 'user_name', user_name);
    const listIdValue = await idToValue('list_id', 'todo_list', 'list_name', list_name);
    if (listIdValue == '' || userIdValue == '') {
      response.status(400).send('user name or list name does not exist');
    } else {
      const sqlDeleteItems = createQuery([
        'DELETE FROM todo_item WHERE user_id = ? AND list_id = ?',
        userIdValue,
        listIdValue,
      ]);
      const sql = createQuery([
        'DELETE FROM todo_list WHERE user_id = ? AND list_id = ?',
        userIdValue,
        listIdValue,
      ]);
      await execQuery(sqlDeleteItems);
      await execQuery(sql);
      response.send(200, 'item deleted successfully');
    }
  } catch (error) {
    console.error(error);
    response.status(400).send('something went wrong');
  }
});

app.put('/todo/done/:user_name/:list_name', async (request, response) => {
  try {
    const user_name = request.params.user_name;
    const list_name = request.params.list_name;
    if (listIdValue == '' || userIdValue == '') {
      response.status(400).send('user name or list name does not exist');
    } else {
      const { todo_desc } = request.body;
      const userIdValue = await idToValue('user_id', 'user', 'user_name', user_name);
      const listIdValue = await idToValue('list_id', 'todo_list', 'list_name', list_name);
      const sql = createQuery([
        'UPDATE `todo_item` SET `is_done` = 1 WHERE `user_id` = ? AND `list_id` = ? AND todo_desc = ?',
        userIdValue,
        listIdValue,
        todo_desc,
      ]);
      await execQuery(sql);
      response.send(200, 'item set to done successfully');
    }
  } catch (error) {
    console.error(error);
    response.status(400).send('something went wrong');
  }
});

app.put('/todo_list/reminder/:list_name', async (request, response) => {
  try {
    const list_name = request.params.list_name;
    const { date } = request.body;
    const listIdValue = await idToValue('list_id', 'todo_list', 'list_name', list_name);
    if (listIdValue == '') {
      response.status(400).send('list name does not exist');
    } else {
      const sql = createQuery([
        'UPDATE `todo_list` SET `reminder` = ? WHERE `list_id` = ?',
        date,
        listIdValue,
      ]);
      await execQuery(sql);
      response.send(200, 'reminder added successfully');
    }
  } catch (error) {
    console.error(error);
    response.status(400).send('something went wrong');
  }
});

app.listen(3000, error => {
  if (error) return console.error(error);

  console.log(`Server started on http://localhost:3000`);
});
