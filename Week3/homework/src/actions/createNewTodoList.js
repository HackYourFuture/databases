'use-strict';

const connection = require('../databaseConfig');
const nanoid = require('nanoid');

const createNewTodoList = async (req, res) => {
  if (req.body.todoListName === '' || req.body.todoListName === null) {
    res.status(400);
    res.json('Please define a todo list name!');
  } else {
    await connection.query(
      `INSERT INTO todolists VALUES(
        '${req.params.userId}',
        '${nanoid()}',
        '${req.body.todoListName}',
        STR_TO_DATE( '${req.body.reminder}', '%d/%m/%Y %H:%i:%s')
        )`
    );
    await connection.query(
      `SELECT * FROM todolists WHERE User_Id = '${req.params.userId}'`,
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

module.exports = createNewTodoList;
