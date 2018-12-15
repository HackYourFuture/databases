const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world'
});

connection.connect();

/* execute this command in mysql client
DELIMITER //
CREATE TRIGGER lan_trigger
    AFTER INSERT
    ON countryLanguage FOR EACH ROW
    BEGIN
         DECLARE counter INT;
        SET counter = (SELECT count(language) FROM countryLanguage where countrycode = NEW.countrycode );
             IF counter >= 10
            THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = ' more than 9 languages added';
        END IF;
    END//
DELIMITER ;*/


const insert_query = "INSERT INTO countrylanguage VALUES('IND', 'new_lan', 'F', 2.8)";
connection.query(insert_query, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log(results);
})
