const fs = require('fs');
const path = require('path');
const mysql = require('mysql');


const config = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
};
const dbWorld = mysql.createConnection(config);

// Connect to the Database
dbWorld.connect((err) => {
  if (err) throw err;
  console.log("Connection established");
});

  const createSqlDb = `CREATE DATABASE IF NOT EXISTS world`;
  dbWorld.query(createSqlDb, (err) => {
    if (err) throw err

    console.log('Database created');
  });

  // Select the database
  dbWorld.query('USE world', (err) => {
    if (err) throw err
    console.log('Database selected.');
  });

  // connect to the database world.sql
  const sqlPathFile = path.join(__dirname, 'world.sql');
  const sqlWorld = fs.readFileSync(sqlPathFile, 'utf-8');

  sqlWorld.split(';').forEach((statement) => {
    dbWorld.query(statement, (err) => {
      if (err) throw err;
    });
  });

  console.log("All SQL statements executed successfully");

// request the database
dbWorld.query(
    "SELECT Name FROM country WHERE Population > 8000000",
    (err, results) => {
        if (err) throw err
        console.log("The countries with Population greater than 8 million")
        results.forEach((row) => {
            console.log(row.Name)
        })
        console.log("------------------------------")
    }
)

dbWorld.query('SELECT Name FROM country WHERE Name LIKE "%land%"',
    (err, results) => {
        if (err) throw err
        console.log("The countries with name containing 'land' ")
        results.forEach((row) => {
            console.log(row.Name)
        })
        console.log("------------------------------")
    })

dbWorld.query(
    "SELECT Name FROM country WHERE Population > 500000 AND Population < 1000000",
    (err, results) => {
        if (err) throw err
        console.log("The countries with Population between 500000 and 1000000")
        results.forEach((row) => {
            console.log(row.Name)
        })
        console.log("------------------------------")
    }
)

dbWorld.query(
    'SELECT Name FROM country WHERE Continent = "Europe"',
    (err, results) => {
        if (err) throw err
        console.log("The countries from Europe")
        results.forEach((row) => {
            console.log(row.Name)
        })
        console.log("------------------------------")
    }
)

dbWorld.query(
    "SELECT Name FROM country ORDER BY SurfaceArea DESC",
    (err, results) => {
        if (err) throw err
        console.log("The countries in descending order by SurfaceArea")
        results.forEach((row) => {
            console.log(row.Name)
        })
        console.log("------------------------------")
    }
)

dbWorld.query('SELECT Name FROM city WHERE CountryCode = "NLD"',
    (err, results) => {
        if (err) throw err
        console.log("The all cities from Netherlands")
        results.forEach((row) => {
            console.log(row.Name)
        })
        console.log("------------------------------")
    }
)

dbWorld.query('SELECT Population FROM city WHERE Name = "Rotterdam"',
    (err, results) => {
        if (err) throw err
        console.log("The population of Rotterdam")
        results.forEach((row) => {
            console.log(row.Population)
        })
        console.log("------------------------------")
    }
)


dbWorld.query(
    "SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10",
    (err, results) => {
        if (err) throw err
        console.log("The most 10 big countries in descending order by SurfaceArea")
        results.forEach((row) => {
            console.log(row.Name)
        })
        console.log("------------------------------")
    }
)
dbWorld.query(
    "SELECT Name FROM city ORDER BY Population DESC LIMIT 10",
    (err, results) => {
        if (err) throw err
        console.log("The most 10 biggest cities in descending order by Population")
        results.forEach((row) => {
            console.log(row.Name)
        })
        console.log("------------------------------")
    }
)   

dbWorld.query('SELECT SUM(Population) AS WorldPopulation FROM country',
    (err, results) => {
        if (err) throw err
        console.log("The total population of the world")
        console.log(results[0].WorldPopulation)
        })

  dbWorld.end((err) => {
    if (err) throw err
    console.log("Disconnected from MySQL server")
})