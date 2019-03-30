const mysql = require('mysql');
const express = require('express');
const app = express();

// Load Todo Routes
const userRoutes = require('./routes/users');
const listRoutes = require('./routes/lists');
const itemRoutes = require('./routes/items');

app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123123',
  database: 'todoList',
});

// connect to database
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});
global.db = db;

// Use routes
app.use('/user', userRoutes);
app.use('/list', listRoutes);
app.use('/item', itemRoutes);

const PORT = 3000;

// set the app to listen on the port
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
