let mysql = require('mysql');
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world'
});

/*
DELIMITER $$
CREATE TRIGGER insert_trigger
 BEFORE INSERT 
 ON countrylanguage FOR EACH ROW 
 BEGIN   
   IF (SELECT count(language) FROM countrylanguage WHERE countrycode = NEW.countrycode) >= 10  THEN
     SIGNAL SQLSTATE '45000'
     SET message_text = '10 languages for each country';
   END IF;
 END;
$$
DELIMITER ;
*/
connection.connect();

connection.query("INSERT INTO countryLanguage VALUES ('JJJ', 'newLanguage', 'F',0.0)", function (error, results) {
  if (error) throw error.message;
  console.log(results);
});

connection.end();
