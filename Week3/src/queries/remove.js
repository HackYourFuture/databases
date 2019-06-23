'use-strict';

const connection = require('./connection');
const { getUsers, getTasks } = require('./get');

const removeUserQuery = `DELETE FROM users WHERE User_Id = ? LIMIT 1`;
const removeTaskListQuery = `DELETE FROM todolists WHERE ToDoList_Id = ? LIMIT 1`;
const removeTaskQuery = `DELETE FROM todos WHERE Todo_Id = ? LIMIT 1`;

const removeUser = async (req, res) => {
  const { userId } = req.params;
  await connection.query(removeUserQuery, userId);
  getUsers(req, res);
};

const removeTaskList = async (req, res) => {
  await connection.query(removeTaskListQuery, req.params.todoListId);
  await connection.query(`SELECT * FROM todolists`, (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.status(200);
      res.json(results);
    }
  });
};

const removeTask = async (req, res) => {
  const { todoId, todoListId } = req.params;
  await connection.query(removeTaskQuery, todoId);
  getTasks(req, res);
};

module.exports = { removeUser, removeTaskList, removeTask };
