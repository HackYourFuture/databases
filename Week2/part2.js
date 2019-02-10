// this comman in mysql client

// DELIMITER //
// CREATE TRIGGER lan_trigger
//     AFTER INSERT
//     ON countryLanguage FOR EACH ROW
//     BEGIN
//          DECLARE counter INT;
//         SET counter = (SELECT count(language) FROM countryLanguage where countrycode = NEW.countrycode );
//              IF counter >= 10
//             THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = ' more than 9 languages added';
//         END IF;
//     END//
// DELIMITER ;



const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world'
});

const execQuery = util.promisify(connection.query.bind(connection));

connection.connect();

async function main() {
  try {
    const result = await execQuery('insert into countrylanguage values("IND", "English", "T", 2.8)');
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

connection.end();