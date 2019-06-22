'use strict';

const express = require('express');
const util = require('util');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todo_app',
});

const execQuery = util.promisify(connection.query.bind(connection));

connection.connect(error => {
  if (error) throw error;
  console.log('\nMysql connected...\n');
});

// view the data of a table in the database
app.get('/:table', async (request, response) => {
  try {
    const result = await execQuery(`SELECT * FROM ${request.params.table}`);
    response.status(200).send(result);
  } catch (error) {
    return response.status(404).send({ error });
  }
  response.end();
});

// Add Todo_item to the database
app.post('/todo_item/add', async (request, response) => {
  try {
    const insert_query_item = `INSERT INTO todo_item (item_name, isTagged, description) VALUES (?, ?, ?)`;
    await execQuery(insert_query_item, [
      request.body.item_name,
      request.body.isTagged,
      request.body.description,
    ]);
    response.status(201).send({ Succeeded: 'Todo item has been added' });
  } catch (error) {
    return response.status(404).send({ error });
  }
  response.end();
});

// Delete Todo_item from the database
app.delete('/todo_item/:id/delete', async (request, response) => {
  try {
    const delete_query_item = `DELETE FROM todo_item WHERE iid = ?`;
    await execQuery(delete_query_item, [request.params.id]);
    response.status(201).send({ Succeeded: 'Todo item has been deleted' });
  } catch (error) {
    return response.status(404).send({ error });
  }
  response.end();
});

// Add Todo_list to the database
app.post('/todo_list/add', async (request, response) => {
  try {
    const insert_query_list = `INSERT INTO todo_list (list_name, category_cid) VALUES (?, ?)`;
    await execQuery(insert_query_list, [request.body.list_name, request.body.category_cid]);
    response.status(201).send({ Succeeded: 'Todo list has been added' });
  } catch (error) {
    return response.status(404).send({ error });
  }
  response.end();
});

// Delete Todo_list from the database
app.delete('/todo_list/:id/delete', async (request, response) => {
  try {
    const delete_query_list = `DELETE FROM todo_list WHERE lid = ?`;
    await execQuery(delete_query_list, [request.params.id]);
    response.status(201).send({ Succeeded: 'Todo list has been deleted' });
  } catch (error) {
    return response.status(404).send({ error });
  }
  response.end();
});

// Mark Todo_item as completed
app.put('/todo_list_item/:id/complete', async (request, response) => {
  try {
    const check_Query = `SELECT isCompleted FROM todo_list_item WHERE todo_item_iid = ?`;
    const checkResult = await execQuery(check_Query, [request.params.id]);
    if (checkResult[0].isCompleted === 1) {
      return response.status(404).send({ Failed: 'Todo_item is already marked as COMPLETED' });
    }
    const update_query_item_complete = `UPDATE todo_list_item SET isCompleted = 1 WHERE todo_item_iid = ?`;
    await execQuery(update_query_item_complete, [request.params.id]);
    response.status(201).send({ Succeeded: 'Todo item has been marked as COMPLETED' });
  } catch (error) {
    return response.status(404).send({ error });
  }
  response.end();
});

// Add a reminder to todo_list
app.put('/user_todo_list/:id/reminder', async (request, response) => {
  try {
    const update_query_list_reminder = `UPDATE user_todo_list SET reminder = ? WHERE todo_list_lid = ?`;
    await execQuery(update_query_list_reminder, [request.body.reminder, request.params.id]);
    response.status(201).send({ Succeeded: 'A reminder has been added to todo_list' });
  } catch (error) {
    return response.status(404).send({ error });
  }
  response.end();
});

const PORT = 4000;
app.listen(PORT, error => {
  if (error) return console.error(error);
  console.log(`Server started on http://localhost:${PORT}`);
});
