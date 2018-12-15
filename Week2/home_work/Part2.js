const mysql = require('mysql');

var connection = mysql.createConnection({
   host: 'localhost',
   user: 'hyfuser',
   password: 'hyfpassword',
   database: 'new_world'
});

/*
DELIMITER $$
CREATE TRIGGER language_trigger
 BEFORE INSERT ON countrylanguage FOR EACH ROW 
 BEGIN   
   IF (SELECT COUNT(language) FROM countrylanguage WHERE countrycode = NEW.countrycode) >= 10  THEN
     SIGNAL SQLSTATE '40000'
     SET message_text = 'Language limit exceeded';
   END IF;
 END;
$$
DELIMITER ;
*/

connection.connect();


var testInsert = "INSERT INTO countrylanguage VALUES('USA', 'hebrew', 't', 5)";
connection.query(testInsert, function (error, result) {
   if (error) throw error;
   console.log(result);
});

connection.end();
