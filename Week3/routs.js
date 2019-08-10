const express = require('express');
const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'toDoList',
});

module.exports = function(app) {
  app.get('/server', (req, res) => res.send('pong'));

  app.post('/todoList/createOne', (req, res) => {
    const newList = req.body.list_name;
    const userId = req.body.user_id;
    const addNewList = `insert into todo_list (user_id,list_name) values ('${userId}','${newList}')`;

    connection.query(addNewList, function(error, resolve) {
      if (error) throw error;
      res.send(resolve);
    });
  });

  app.post('/todoItem/createOne', (req, res) => {
    const UserId = req.body.user_id;
    const ListId = req.body.list_id;
    const title = req.body.title;
    const description = req.body.description;

    const addNewItem = `insert into todo_item (list_id,user_id,title,description) values ('${ListId}','${UserId}','${title}','${description}')`;
    connection.query(addNewItem, function(error, resolve) {
      if (error) throw error;
      res.send(resolve);
    });
  });

  app.delete('/todoItem/deleteOne', (req, res) => {
    const itemId = req.body.item_id;
    const deleteItem = `delete from todo_item where item_id = '${itemId}'`;

    connection.query(deleteItem, function(error, resolve) {
      if (error) throw error;
      res.send(resolve);
    });
  });

  app.delete('/todoList/deleteOne', (req, res) => {
    const ListId = req.body.list_id;

    const deleteList = `delete from todo_list where list_id = '${ListId}'`;
    connection.query(deleteList, function(error, resolve) {
      if (error) throw error;
      res.send(resolve);
    });
  });

  app.put('/todoItem/markDone', (req, res) => {
    console.log(req.body.item_id);
    const itemId = req.body.item_id;
    const itemCompleted = `update todo_item set completed = 1 where item_id = '${itemId}'`;

    connection.query(itemCompleted, function(error, resolve) {
      if (error) throw error;
      res.send(resolve);
    });
  });

  app.put('/todoList/addReminder', (req, res) => {
    const listId = req.body.list_id;

    const listReminder = `update todo_list set reminder = 1 where list_id = '${listId}' and user_id = 1 `;
    connection.query(listReminder, function(error, resolve) {
      if (error) throw error;
      res.send(resolve);
    });
  });

  app.post('/users/newUser', (req, res) => {
    const UserName = req.body.user_name;

    const addNewUser = `INSERT INTO users (user_name) VALUES ('${UserName}')`;
    connection.query(addNewUser, function(error, resolve) {
      if (error) throw error;
      res.send(resolve);
    });
  });

  app.delete('/users/deleteUser', (req, res) => {
    const userID = req.body.user_id;

    const deleteUser = `delete from users where user_id = '${userID}'`;
    connection.query(deleteUser, function(error, resolve) {
      if (error) throw error;
      res.send(resolve);
    });
  });
};
