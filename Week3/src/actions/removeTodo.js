'use-strict';

const connection = require('./databaseConfig');

const removeTodo = async (req, res) => {
  await connection.query(`DELETE FROM todos WHERE Todo_Id = '${req.params.todoId}' LIMIT 1`);
  await connection.query(
    `SELECT * FROM todos WHERE ToDoList_Id = '${req.params.todoListId}'`,
    (error, results, fields) => {
      if (error) {
        res.send(error);
      } else {
        res.status(200);
        res.json(results);
      }
    },
  );
};

module.exports = removeTodo;
