var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

connection.connect();

function sendQuery(query, condition) {
  connection.query(query, function(error, results, fields) {
    if (error) {
      throw error;
    }
    if (condition) {
      switch (condition) {
        case 'language10':
          console.log('alert', results);
          if (results[0].Languages > 9) {
            throw new Error('');
          } else {
            console.log('the reply is ', results);
          }
          break;

        default:
          break;
      }
    } else {
      console.log('the reply is ', results[0]);
    }
  });
}

// I want to get alerts when a country has >= 10 languages.
//E.g.If a country X has 9 languages in the CountryLanguage table,
//and a user INSERTs one more row in the CountryLanguage table,
// then I should get an alert.How can I achieve this ?

// Write the necessary SQL statements for this solution and
// Test your solution with example insert statements.

const languages_Of_Country =
  'SELECT country.Name, COUNT(countrylanguage.Language) as Languages FROM countrylanguage INNER JOIN country ON country.Code = countrylanguage.CountryCode GROUP BY country.Name';
sendQuery(languages_Of_Country, 'language10');

connection.end();
