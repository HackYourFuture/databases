import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
})

connection.connect()

const queries = [
  {
    description: 'Countries with population > 8 million',
    sql: `SELECT Name FROM country WHERE Population > 8000000;`,
  },
  {
    description: 'Countries with "land" in the name',
    sql: `SELECT Name FROM country WHERE Name LIKE '%land%';`,
  },
  {
    description: 'Cities with population between 500,000 and 1 million',
    sql: `SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000;`,
  },
  {
    description: 'Countries on the continent Europe',
    sql: `SELECT Name FROM country WHERE Continent = 'Europe';`,
  },
  {
    description: 'Countries ordered by surface area (desc)',
    sql: `SELECT Name FROM country ORDER BY SurfaceArea DESC;`,
  },
  {
    description: 'Cities in the Netherlands',
    sql: `SELECT city.Name FROM city JOIN country ON city.CountryCode = country.Code WHERE country.Name = 'Netherlands';`,
  },
  {
    description: 'Population of Rotterdam',
    sql: `SELECT Population FROM city WHERE Name = 'Rotterdam';`,
  },
  {
    description: 'Top 10 countries by surface area',
    sql: `SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10;`,
  },
  {
    description: 'Top 10 most populated cities',
    sql: `SELECT Name, Population FROM city ORDER BY Population DESC LIMIT 10;`,
  },
  {
    description: 'Total population of the world',
    sql: `SELECT SUM(Population) AS WorldPopulation FROM country;`,
  },
]

queries.forEach((query, index) => {
  connection.query(query.sql, (err, results) => {
    if (err) {
      console.log(`Error running query ${index + 1}:`, err.message)
    } else {
      console.log(`\n${index + 1}. ${query.description}`)
      console.log(results)
    }

    if (index === queries.length - 1) {
      connection.end()
    }
  })
})
