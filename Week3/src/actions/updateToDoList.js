'use-strict';

const connection = require('./databaseConfig');

const updateTodoList = async (req, res) => {
  if (req.body.todoListName === '' || req.body.todoListName === null) {
    res.status(400);
    res.json('Please define a todo list name!');
  } else {
    await connection.query(`
    UPDATE todolists 
    SET ToDoList_Name = '${req.body.todoListName}',
    Reminder = STR_TO_DATE( '${req.body.reminder}', '%d/%m/%Y %H:%i:%s')
    WHERE ToDoList_Id = '${req.params.todoListId}';
    `);
    await connection.query(
      `SELECT * FROM todolists WHERE User_Id = '${req.params.userId}'`,
      (error, results, fields) => {
        if (error) {
          res.send(error);
        } else {
          res.status(200);
          res.json(results);
        }
      },
    );
  }
};

module.exports = updateTodoList;
