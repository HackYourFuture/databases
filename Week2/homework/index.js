const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'new_world',
});

connection.connect();

const data = require('./cities.json');
const { countries } = data;
const { cities } = data;

function getCapitalCity(id, req, res) {
  connection.query(`select * from cities where id = "${id}"`, (error, results, fields) => {
    if (error) {
      console.log(error);
    }
    res.send(results);
  });
}

app.get(`/capital/:name`, (req, res) => {
  const { name } = req.params;
  connection.query(`select * from countries where name ="${name}"`, (error, results, fields) => {
    if (error) {
      console.log(error);
    }
    var capitalId = results.map(element => {
      return element.Capital;
    });
    getCapitalCity(capitalId, req, res);
  });
});

app.get(`/languages/:region`, (req, res) => {
  const { region } = req.params;
  connection.query(
    `select language from countries where region = "${region}"`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
      }
      res.send(results);
    },
  );
});

app.get(`/cities/:languages`, (req, res) => {
  const { languages } = req.params;
  connection.query(
    `select count(name) from cities where language = "${languages}"`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
      } else {
        res.send(results);
      }
    },
  );
});

app.get('/countries/:region/:languages', (req, res) => {
  const { region, languages } = req.params;
  connection.query(
    `select * from countries where region = "${region}" and language = "${languages}";`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
        res.send('False');
      } else {
        res.send(results);
      }
    },
  );
});

app.get('/countries/:continent', (req, res) => {
  const { continent } = req.param;
  connection.query(
    `select count(language), continent from countries group by continent ;`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        res.send(results);
      }
    },
  );
});

app.get(`/countries/:languages`, (req, res) => {
  const { languages } = req.params;
  connection.query(
    `select count(name) from countries where language = "${languages}"`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
      } else if (results >= 10) {
        res.send(
          `ALERT ALERT ALERT :)  Country has more than 10 languages. It has ${results} languages`,
        );
      } else {
        res.send(results);
      }
    },
  );
});

app.listen(2000, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server started on port 2000`);
  }
});
