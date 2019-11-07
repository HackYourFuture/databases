const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'myWorld',
});

connection.connect();

function makeQuery(query) {
  connection.query(query, (err, results, fields) => {
    if (err) console.log(`message: ${err}`);
    for (i in results) {
      console.log(results[i]);
    }
  });
}

// question 4: Write queries (that's a technical term meaning 'requests for information from a database') that will retrieve data that answers the following questions:

//What are the names of the countries with population greater than 8 million

const question4a = 'SELECT Name, Population FROM countries WHERE Population > 8000000;';
makeQuery(question4a);

// What are the names of the countries that have “land” in their names ?

const question4b = `SELECT Name FROM countries WHERE Name LIKE '%land%'`;
makeQuery(question4b);

// What are the names of the cities with population in between 500,000 and 1 million ?

const question4c = `SELECT Name, Population FROM cities WHERE Population BETWEEN 500000 AND 1000000`;
makeQuery(question4c);

// What are the names of all the countries on the continent ‘Europe’ ?

const question4d =  `SELECT Name FROM countries WHERE Continent LIKE '%Europe%'`,
makeQuery(question4d);

//List all the countries in the descending order based on their surface areas.

const question4e = `SELECT Name FROM countries ORDER BY SurfaceArea DESC`,
makeQuery(question4e);

connection.end();
