const util = require('util');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

const execQuery = util.promisify(connection.query.bind(connection));

//  write this in the Mysql Command Line Client

/*
DELIMITER $$
CREATE TRIGGER lang_trigger 
BEFORE INSERT ON countrylanguage 
FOR EACH ROW 
BEGIN 
  IF (SELECT count(language) FROM countrylanguage WHERE countrycode = NEW.countrycode) >= 10 
  THEN SIGNAL SQLSTATE '45000' 
  SET message_text = 'It has 10 languages per country'; 
  END IF; 
END$$
DELIMITER ;
*/

async function seedDB() {
  connection.connect();
  try {
    const test = await execQuery("INSERT INTO countryLanguage VALUES ('CHE', 'French', 'T', 23.4)");
    console.log(test);
  } catch (error) {
    console.log(error);
  }
  connection.end();
}
seedDB();
