const express = require('express');
const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todoapp'
});
const app = express();
const PORT = 3000;

app.use(express.json());

const execQuery = util.promisify(connection.query.bind(connection))


// shows todolist
app.get('/todoLists/:id', async (req, res) => {
  try {
    const selectQuery1 = 'SELECT * from todolist WHERE id=?';
    const result = await execQuery(selectQuery1, req.params.id);
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
})

//adds list
app.post('/addList', async (req, res) => {
  try {
    const selectQuery2 = 'INSERT INTO todolist(name,userid) values(?,?)';
    await execQuery(selectQuery2, [req.body.name, req.body.user]);
    res.status(200).json({
      message: 'List added'
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
})

//deletes a list
app.delete('/deleteList/:id', async (req, res) => {
  try {
    const selectQuery2 = 'DELETE FROM todolist WHERE id=?';
    await execQuery(selectQuery2, req.params.id);
    res.status(200).json({
      message: 'List deleted'
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
})

//shows todo items of a todo list
app.get('/:listId/getTodo', async (req, res) => {
  try {
    const selectQuery1 = 'SELECT * FROM todoitem WHERE listid=?';
    const result = await execQuery(selectQuery1, req.params.listId);
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
})

//adds todo item
app.post('/:listId/addTodo', async (req, res) => {
  try {
    const selectQuery2 = 'INSERT INTO todoitem(name,iscompleted,listid) values(?,?,?)';
    await execQuery(selectQuery2, [req.body.name, req.body.iscompleted, req.params.listId]);
    res.status(200).json({
      message: 'todo item added'
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
})

//deletes todo item
app.delete('/:listId/deleteTodo/:id', async (req, res) => {
  try {
    const selectQuery2 = 'DELETE FROM todoitem WHERE id=? AND listid=?';
    await execQuery(selectQuery2, [req.params.id, req.params.listId]);
    res.status(200).json({
      message: 'todo item deleted'
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
})

//marks a todoItem completed
app.put('/:listId/markAs/:id', async (req, res) => {
  try {
    const selectQuery2 = 'UPDATE todoitem SET iscompleted="true" WHERE id=? AND listid=?';
    await execQuery(selectQuery2, [req.params.id, req.params.listId]);
    res.status(200).json({
      message: 'todo item completed'
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
})

//adds reminder to a list
app.post('/:listId/reminder', async (req, res) => {
  try {
    const selectQuery2 = 'UPDATE todoList SET reminder=? WHERE id=?';
    await execQuery(selectQuery2, [req.body.date, req.params.listId]);
    res.status(200).json({
      message: 'reminder date added'
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));