const express = require('express');
const app = express();
const parser = require('body-parser');
const path = require('path');
const body_parser = require('body-parser');
const urlParser = body_parser.urlencoded({
  extended: false,
});

const mysql = require('mysql');
var con = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todo',
});

app.use(express.urlencoded());

con.connect();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.get('/Signup', (req, res) => {
  res.render('Signup');
});
app.get('/About', (req, res) => {
  res.render('About');
});
app.get('/Home', (req, res) => {
  res.render('index');
});

// sign up => add user
app.post('/Signup', urlParser, (req, res) => {
  con.query('select * from users', (err, result) => {
    if (err) console.log(err);
    con.query(
      `insert into users values (?,?,?)`,
      [result.length + 1, req.body.username, req.body.password],
      (err, data) => {
        if (err) {
          res.render('error', { data: 'error' });
        } else {
          res.render('index');
        }
        con.end();
      },
    );
  });
});

// log in => get user todo list
app.get('/login/user', urlParser, (req, res) => {
  con.query(
    `select username,password from users where username= '${req.query.username}'`,
    (err, data) => {
      if (err) res.render('login', { error: err });
      if (!data[0]) {
        res.render('login', { error: `username or password not correct` });
      } else if (data[0].password !== req.query.password) {
        res.redirect('login');
      } else {
        con.query(
          ` select id,name from list where uid = (select id from users where username='${req.query.username}');`,
          (err, option) => {
            res.render('user', {
              username: req.query.username,
              password: req.query.password,
              items: option,
            });
            con.end();
          },
        );
      }
    },
  );
});

//  add list
app.post('/user/add/list', urlParser, (req, res) => {
  con.query(`select id from users where username = '${req.body.username}' ;`, (err, response) => {
    if (err) console.log(err);
    con.query(
      `insert into list (name,uid,deadline,reminderid) values (?,?,?,?)`,
      [req.body.name, response[0].id, req.body.deadline, req.body.reminder],
      (err, data) => {
        if (err) console.log(err);
        con.query(
          ` select id,name from list where uid = (select id from users where username='${req.body.username}');`,
          (err, option) => {
            res.render('user', {
              username: req.body.username,
              password: req.body.password,
              items: option,
            });
            con.end();
          },
        );
      },
    );
  });
});

// add item
app.post('/user/add/item', urlParser, (req, res) => {
  con.query(
    `insert into items (description,listid) values (?,?)`,
    [req.body.description, req.body.list],
    (err, result) => {
      if (err) console.log(err);
      con.query(
        ` select id,name from list where uid = (select id from users where username='${req.body.username}');`,
        (err, option) => {
          res.render('user', {
            username: req.body.username,
            password: req.body.password,
            items: option,
          });
          con.end();
        },
      );
    },
  );
});

//  show lists
app.get('/user/lists', urlParser, (req, res) => {
  con.query(
    `select * from items inner join list on items.listid = list.id where uid in (select id from users where username='${req.query.username}') group by name;`,
    (err, result) => {
      if (result == 0) {
        res.render('lists', {
          username: req.query.username,
          error: `you don't have any list yet!`,
        });
      }
      res.render('lists', { username: req.query.username, result: result, error: null });
      con.end();
    },
  );
});

// delete list
app.get('/user/lists/delete/', urlParser, (req, res) => {
  const listName = req.query[Object.keys(req.query)];
  const queries = [
    `delete from list where name='${listName}';`,
    `delete from items where listid in(select id from list where name= '${listName}');`,
  ];
  queries.forEach(query => {
    con.query(query, (err, results) => {
      if (err) res.render('error', { data: err });
      res.render('error', { data: 'delete list succeeded' });
    });
  });
  con.end();
});

//  show list
app.get('/user/lists/show', urlParser, (req, res) => {
  const listName = req.query[Object.keys(req.query)];
  con.query(
    `select * from items where listid in (select id from list where name='${listName}')`,
    (err, response) => {
      console.log(response);
      res.render('list', { result: response, listName: listName });
      con.end();
    },
  );
});

// mark as done
app.post('/user/lists/show/:id', urlParser, (req, res) => {
  con.query(`update items set done='t' where id = ${req.params.id}`, (err, data) => {
    if (err) res.render('error', { data: err });
    res.render('succeed', { message: 'mark as done' });
  });
  con.end();
});
app.listen(port, () => console.log(`todo app listening on port ${port} ...`));
