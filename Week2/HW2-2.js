'use strict';

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

/* msq commands:
	DELIMITER $$
	CREATE TRIGGER language_trigger
	 AFTER INSERT 
	 ON countrylanguage FOR EACH ROW 
	 BEGIN   
	   IF (SELECT count(language) FROM countrylanguage WHERE countryCode = NEW.countryCode) >= 10  THEN
	     SIGNAL SQLSTATE '45000'
	     SET message_text = '10 or more languages for each country';
	   END IF;
	 END $$
	DELIMITER ;
  */
try {
  const new_query = await execQuery(
    "INSERT INTO countrylanguage VALUES('XXX', 'newLanguage', default, 0.0)",
  );
  console.log(new_query);
} catch (error) {
  console.error(error);
}
