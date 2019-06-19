const connection = require('./databaseConfig');
const nanoid = require('nanoid');

const createNewTodo = async (req, res) => {
  if (req.body.todo === '' || req.body.todo === null) {
    res.status(400);
    res.json('Please define a todo!');
  } else {
    await connection.query(
      `INSERT INTO todos VALUES(
        '${req.params.todoListId}',
        '${nanoid()}',
        '${req.body.todo}',
        '${req.body.done}',
        STR_TO_DATE( '${req.body.dueDate}', '%d/%m/%Y %H:%i:%s'),
        '${req.body.tag}'
        )`,
    );
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
  }
};
module.exports = createNewTodo;
