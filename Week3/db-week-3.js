'use strict';
const util = require('util');
const fs = require('fs');
const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3020;

const todoDatabase = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todo',
  multipleStatements: true,
};

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

const CREATE_TABLE_TODOS = `CREATE TABLE IF NOT EXISTS todos ( 
  todoid VARCHAR(30) PRIMARY KEY,
  reminder text 
  );`;

const CREATE_TABLE_ITEMS = `CREATE TABLE IF NOT EXISTS items (
    item VARCHAR(30),
    isdone enum('Yes', 'No'),
    belongs_to VARCHAR(30),
    
    FOREIGN KEY (belongs_to)
    REFERENCES todos(todoid)
    ON DELETE CASCADE
    );`;

app.get('/', async function(req, res) {
  try {
    const connection = mysql.createConnection(todoDatabase);
    const execQuery = util.promisify(connection.query.bind(connection));
    await execQuery(CREATE_TABLE_TODOS);
    await execQuery(CREATE_TABLE_ITEMS);
    res.sendFile(__dirname + '/pages/index.html');
    connection.end();
  } catch (err) {
    if (err) {
      throw err;
    }
  }
});

app.get('/download', function(req, res) {
  const file = `${__dirname}/instructions/Readme.md`;
  res.download(file);
});

app.get('/view', async (req, res) => {
  try {
    const connection = mysql.createConnection(todoDatabase);
    const execQuery = util.promisify(connection.query.bind(connection));
    const listQuery = `select todoid, reminder, item, isdone from todos, items where todos.todoid = items.belongs_to;`;
    const data = await execQuery(listQuery);
    res.render('todo', { title: 'Lists', items: data });
    connection.end();
    }
  } catch (err) {
    if (err) {
      throw err;
    }
  }
});

app.get('/addItems', async function(req, res) {
  try {
    res.status(202).sendFile(__dirname + '/pages/addItems.html');
  } catch (err) {
    if (err) {
      throw err;
    }
  }
});

app.get('/viewOnlyLists', async (req, res) => {
  try {
    const connection = mysql.createConnection(todoDatabase);
    const execQuery = util.promisify(connection.query.bind(connection));
    const onlyListQuery = `select todoid from todos;`;
    await execQuery(onlyListQuery).then(data => {
      if (data.length == 0) {
        res.render('index', {
          title: 'Only List',
          message: "You don't have any lists, please create some.",
        });
      } else {
        res.render('todoList', { title: 'Lists', items: data });
      }
    });
    connection.end();
  } catch (err) {
    if (err) {
      throw err;
    }
  }
});

app.post('/submitList', async function(req, res) {
  try {
    const todoid = req.body.todoid;
    const reminder = req.body.reminder;
    const connection = mysql.createConnection(todoDatabase);
    const execQuery = util.promisify(connection.query.bind(connection));
    const todoQuery = `INSERT INTO todos VALUES (?, ?)`;
    const newList = await execQuery(todoQuery, [todoid, reminder]);
    if (newList.length === 0) {
      res.render('index', {
        message: 'A list name or a reminder cannot be empty. Please go back and fill the inputs',
      });
    } else {
      res.render('index', { message:'Thank you for your patience! Your list is saved!' });
      connection.end();
    }
  } catch (err) {
    if (err) {
      throw err;
    }
  }
});

app.post('/createList/:todoid/:reminder', async function(req, res) {
  try {
    const todoid = req.params.todoid;
    const reminder = req.params.reminder;
    const connection = mysql.createConnection(todoDatabase);
    const execQuery = util.promisify(connection.query.bind(connection));
    const todoQuery = `INSERT INTO todos VALUES (?, ?)`;
    await execQuery(todoQuery, [todoid, reminder]).then(data => {
if (data.length === 0) {
      res.send('A list name or a reminder cannot be empty. Please go back and fill the inputs');
      connection.end();
    } else {
      res.send('Your list is succesfully created ');
      connection.end();
    }})
  } catch (err) {
    if (err) {
      throw err;
    }
  }
});



app.post('/saveAddItem', async (req, res) => {
  try {
    const task = req.body.task;
    const isDone = req.body.isdone;
    const listName = req.body.listName;
    const connection = mysql.createConnection(todoDatabase);
    const execQuery = util.promisify(connection.query.bind(connection));
    const itemQuery = `INSERT INTO items VALUES (?, ?, ?)`;
    await execQuery(itemQuery, [task, isDone, listName]);
    res.render('index', {
      message: 'Thank you! Your item is saved to your list!',
      prevPage: 'Home Page',
    });
    connection.end();
  } catch (err) {
    if (err) {
      throw err;
    }
  }
});


app.post('/addItem/:task/:isdone/:listName', async (req, res) => {
  try {
    const task = req.params.task;
    const isDone = req.params.isdone;
    const listName = req.params.listName;
    const connection = mysql.createConnection(todoDatabase);
    const execQuery = util.promisify(connection.query.bind(connection));
    const itemQuery = `INSERT INTO items VALUES (?, ?, ?)`;
    await execQuery(itemQuery, [task, isDone, listName]);
    res.status(202).send('Thank you! Your item is saved to your list!');
    if(!task || !isDone || !listName){
      res.status(404).send('You typed something wrong. Please check your spelling. ')
    }
    connection.end();
  } catch (err) {
    if (err) {
      throw err;
    }
  }
});



app.put('/update/:item/:isdone', async (req, res) => {
  try {
    const item = req.params.item;
    const isDone = req.params.isDone;
    const connection = mysql.createConnection(todoDatabase);
    const execQuery = util.promisify(connection.query.bind(connection));
    const updateQuery = `UPDATE items SET isdone = ? Where items.item = ?;`;
    execQuery(updateQuery, [item, isDone]).then(res.status(201).send('Your item is up-to-date!'));
    if(!item){
      return res.status(404).send( res.status + 'Item not found')
    }
    connection.end();
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
});

app.get('/delete', async (req, res) => {
  try {
    const connection = mysql.createConnection(todoDatabase);
    const execQuery = util.promisify(connection.query.bind(connection));
    const showList = `SELECT item, belongs_to from items;`;
    const lists = await execQuery(showList);
    res.render('deleteList', {
      title: 'Delete List',
      explanation:
        'So now, for deleting some list items, please use postman. Below, i am leaving you all of your tasks and the lists they belong to',
      items: lists,
    });
  } catch (err) {
    if (err) {
      throw err;
    }
  }
});

app.delete('/deleteItem/:item', async (req, res) => {
  try {
    const connection = mysql.createConnection(todoDatabase);
    connection.query(
      `DELETE FROM items where items.item = ?`,
      [req.params.item],
      (err, rows, fields) => {
        if (res.status(202)) res.send('Deleted Succesfuly');
        if(!req.params.item){
          res.status(404).send('Item not found, please make sure you write it correctly')
        }
      },
    );
    connection.end();
  } catch (err) {
    if (err) {
      throw err;
    }
  }
});

app.delete('/deleteList/:list', async (req, res) => {
  try {
    const connection = mysql.createConnection(todoDatabase);
    connection.query(
      `DELETE FROM todos where todoid = ?`,
      [req.params.list],
      (err, rows, fields) => {
        if (!err) res.status(202).send('Deleted Succesfuly');
       if(!req.params.list){
         res.status(404).send('List not found. Please make sure that you wrote it correctly.')
       }
      },
    );
    connection.end();
  } catch (err) {
    if (err) {
      throw err;
    }
  }
});


app.delete('/deleteAll', async (req, res) => {
  try {
    const connection = mysql.createConnection(todoDatabase);
    connection.query(
      `DELETE FROM todos;`,
      (err, rows, fields) => {
        if (!err) res.status(200).send('Deleted Succesfuly');
      }
    );
    connection.end();
  } catch (err) {
    if (err) {
      res.send(err);
    }
  }
});


app.listen(port, () => console.log(`You are listening to port ${port}`));
