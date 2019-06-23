'use-strict';

const connection = require('./connection');
const markTodoAsDoneQuery = `UPDATE todos SET Done = 'true' WHERE Todo_Id = ?;`;

const getUsers = (req, res) => {
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) {
      res.Status(400);
    } else {
      res.status(200);
      res.json(results);
    }
  });
};

const getTaskLists = (req, res) => {
  const { userId } = req.params;
  connection.query(`SELECT * FROM todolists WHERE User_Id = '${userId}'`, (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.status(200);
      res.json(results);
    }
  });
};

const getTasks = (req, res) => {
  const { todoListId } = req.params;
  connection.query(`SELECT * FROM todos WHERE ToDoList_Id = '${todoListId}'`, (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.status(200);
      res.json(results);
    }
  });
};

const markTodoAsDone = async (req, res) => {
  const { todoListId, todoId } = req.params;
  await connection.query(markTodoAsDoneQuery, todoId);
  getTasks(req, res);
};
module.exports = { getUsers, getTaskLists, getTasks, markTodoAsDone };
