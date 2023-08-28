import mysql from 'mysql';

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the world database!');
});

const queryObject = [
  {
    question:
      'What are the names of countries with population greater than 8 million?',
    query: 'SELECT Name FROM country WHERE Population > 8000000',
  },
  {
    question:
      'What are the names of countries that have “land” in their names?',
    query: "SELECT Name FROM country WHERE Name LIKE '%land%'",
  },
  {
    question:
      'What are the names of the cities with population BETWEEN 500,000 and 1 million?',
    query: 'SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000',
  },
  {
    question: "What's the name of all the countries on the continent ‘Europe’?",
    query: "SELECT Name FROM country WHERE Continent = 'Europe'",
  },
  {
    question:
      'List all the countries in the descending order of their surface areas.',
    query: 'SELECT Name FROM country ORDER BY SurfaceArea DESC',
  },
  {
    question: 'What are the names of all the cities in the Netherlands?',
    query: "SELECT Name FROM city WHERE CountryCode = 'NLD'",
  },
  {
    question: 'What is the population of Rotterdam?',
    query: "SELECT Population FROM city WHERE Name = 'Rotterdam'",
  },
  {
    question: "What's the top 10 countries by Surface Area?",
    query: 'SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10',
  },
  {
    question: "What's the top 10 most populated cities?",
    query: 'SELECT Name FROM city ORDER BY Population DESC LIMIT 10',
  },
  {
    question: 'What is the population number of the world?',
    query: 'SELECT SUM(Population) FROM country',
  },
];

queryObject.forEach((queryObject) => {
  connection.query(queryObject.query, (error, results) => {
    if (error) {
      console.log('Error showing the results');
      return;
    }
    console.log(queryObject.question);
    console.log(results);
  });
});

connection.end((error) => {
  if (error) {
    console.log('Error ending the connection');
  }
  console.log('Connection ended');
});
