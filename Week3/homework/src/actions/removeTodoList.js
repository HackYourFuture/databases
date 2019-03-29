'use-strict';

const connection = require('../databaseConfig');

const removeTodoList = (req, res) => {
  connection.query(`DELETE FROM todolists WHERE ToDoList_Id = '${req.params.todoListId}'`);
  connection.query(`SELECT * FROM todolists`, (error, results, fields) => {
    if (error) {
      res.send(error);
    } else {
      res.status(200);
      res.json(results);
    }
  });
};

module.exports = removeTodoList;
