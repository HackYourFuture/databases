const util = require('util');
const mysql = require('mysql');
const express = require('express');

const app = express();
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'tododatabase',
});

connection.connect(err => {
  if (err) throw err;
  console.log('database is connected');
});

const execQuery = util.promisify(connection.query.bind(connection));

// select all
app.get('/items/all', async (req, res) => {
  await execQuery('use tododatabase');
  let select = `select * from items`;
  let result = await execQuery(select);
  res.status(200).send(result);
  res.end();
});

// select depend on ID
app.get('/items/:id', async (req, res) => {
  await execQuery('use tododatabase');
  let select = `select * from items where ID = ?`;
  let result = await execQuery(select, req.params.id);
  res.status(200).send(result);
  res.end();
});

// Insert item(s) in ToDo list
app.post('/items/add', async (req, res) => {
  await execQuery('use tododatabase');
  await execQuery(
    `insert into items (ID , Name, Description)
    values ( ${req.body.ID} , '${req.body.Name}' , '${req.body.Description}')`,
  );
  res.status(201).send('has been added successfully');
  res.end();
});

// Delete item(s) in ToDo list
app.delete('/items/:id', async (req, res) => {
  await execQuery('use tododatabase');
  const sql = `delete from items where ID = ?`;
  await execQuery(sql, req.params.id);
  res.status(201).send(`one row has been removed`);
  res.end();
});

// Create a new ToDo list
app.post('/todolist/add', async (req, res) => {
  await execQuery('use tododatabase');
  await execQuery(
    `insert into todolist (ID , Name, Description , IsCompleted , category_id)
    values ( ${req.body.ID} , '${req.body.Name}' , '${req.body.Description}' , ${
      req.body.IsCompleted
    } , ${req.body.category_id})`,
  );
  res.status(201).send('has been added successfully');
  res.end();
});

// Delete a ToDo list
app.delete('/todolist/:id', async (req, res) => {
  await execQuery('use tododatabase');
  const sql = `delete from todolist where ID = ?`;
  await execQuery(sql, req.params.id);
  res.status(201).send(`one row has been removed`);
  res.end();
});

// Mark an item as completed
app.put('/todolist/:id', async (req, res) => {
  const sql = `UPDATE todolist SET  IsCompleted = 1 WHERE ID= ? `;
  await execQuery(sql, req.params.id);
  res.status(201).send('has been modified to completed');
  res.end();
});

// Add a reminder for the list (not for the item)

app.listen(3000, () => {
  console.log('listening to port 3000');
});
