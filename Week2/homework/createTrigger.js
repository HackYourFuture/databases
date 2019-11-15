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

app.get(`/country/languages`, async (req, res) => {
  await connection.query(`DROP TRIGGER IF EXISTS lang_trigger ;`, (error, results, fields) => {
    if (error) {
    } else {
      console.log(results);
    }
  });
  await connection.query(
    `
    CREATE TRIGGER lang_trigger BEFORE INSERT ON countrylanguage 
    FOR EACH ROW BEGIN DECLARE message varchar(255);
    DECLARE languagesForCountry INT;
    SET languagesForCountry = (SELECT COUNT(language) FROM countrylanguage WHERE countrycode = NEW.countrycode);
    IF languagesForCountry>= 10 
    THEN 
    SET message = "Country has more than 9 languages";
    SET lc_messages = message; 
    SIGNAL SQLSTATE "42000";
    END IF;
    END;
    `,
    (error, results, fields) => {
      if (error) {
        console.log(error);
      }
      res.send(results);
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
