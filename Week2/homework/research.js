'use strict';

/*
The following commands are to be typed in MYSQL command line client:

DELIMITER $$
CREATE TRIGGER insertion_trigger
 AFTER INSERT ON countrylanguage FOR EACH ROW 
 BEGIN   
   IF (SELECT COUNT(countrycode) FROM countrylanguage WHERE countrycode = NEW.countrycode) >= 10  THEN
     SIGNAL SQLSTATE '45000'
     SET message_text = 'Insertion limit exceeded for this country!';
   END IF;
 END$$

DELIMITER ;
*/

const mysql = require('mysql');
const util = require('util');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

const execQuery = util.promisify(connection.query.bind(connection));

connection.connect();

(async function() {
  try {
    const result = await execQuery('insert into countrylanguage values("RUS", "Dutch", "T", 55)');
    console.log(result);
  } catch (err) {
    console.error(err);
  }
})();

connection.end();
