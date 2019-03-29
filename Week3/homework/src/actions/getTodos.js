'use-strict';

const connection = require('../databaseConfig');

const getTodos = (req, res) => {
  connection.query(
    `SELECT * FROM todos WHERE ToDoList_Id = '${req.params.todoListId}'`,
    (error, results, fields) => {
      if (error) {
        res.send(error);
      } else {
        res.status(200);
        res.json(results);
      }
    }
  );
};

module.exports = getTodos;
