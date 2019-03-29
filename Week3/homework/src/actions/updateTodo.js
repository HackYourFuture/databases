'use-strict';

const connection = require('../databaseConfig');

const updateTodo = (req, res) => {
  if (req.body.todo === '' || req.body.todo === null) {
    res.status(400);
    res.json('Please define a todo name!');
  } else {
    connection.query(`
    UPDATE todos 
    SET Todo_Name = '${req.body.todo}',
    Due_date = STR_TO_DATE( '${req.body.dueDate}', '%d/%m/%Y %H:%i:%s'),
    Tag = '${req.body.tag}'
    WHERE Todo_Id = '${req.params.todoId}';
    `);
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
  }
};

module.exports = updateTodo;
