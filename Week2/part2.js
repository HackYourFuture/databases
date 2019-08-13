// I want to get alerts when a country has >= 10 languages.
//E.g.If a country X has 9 languages in the CountryLanguage table,
//and a user INSERTs one more row in the CountryLanguage table,
// then I should get an alert.How can I achieve this ?

// Write the necessary SQL statements for this solution and
// Test your solution with example insert statements.

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

connection.connect();

function sendQuery(query) {
  connection.query(query, function(error, results, fields) {
    if (error) {
      throw error;
    } else {
      console.log('the reply is ', results);
    }
  });
}

const dropedTrigger = `drop TRIGGER IF EXISTS my_trigger`;
sendQuery(dropedTrigger);

const myTrigger = `
CREATE TRIGGER my_trigger 
    BEFORE INSERT
        ON countrylanguage
            FOR EACH ROW
            BEGIN
                DECLARE message VARCHAR(100);
                DECLARE sd INT;
                SET sd= (SELECT COUNT(countrylanguage.Language) AS Languages
                FROM countrylanguage
                WHERE countrylanguage.CountryCode = country.CountryCode);
                IF sd > 9
                THEN
                    set message= 'alert, the table is full!';
                    SET lc_messages=message; SIGNAL SQLSTATE '45000';
                END IF;
            END`;
sendQuery(myTrigger);

const newLnaguage = "INSERT INTO countrylanguage VALUES ('NLD','Arabic11','T',5.3)";
sendQuery(newLnaguage);

connection.end();
