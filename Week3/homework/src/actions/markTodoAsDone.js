'use-strict';

const connection = require('../databaseConfig');

const markTodoAsDone = async (req, res) => {
  await connection.query(`
    UPDATE todos 
    SET Done = 'true'
    WHERE Todo_Id = '${req.params.todoId}';
    `);
  await connection.query(
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

module.exports = markTodoAsDone;
