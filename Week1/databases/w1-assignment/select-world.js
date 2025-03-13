import mysql from "mysql2/promise";

// Establish connection to mysql database
const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "world",

});

// Function to execute a given SQL query
async function runQuery(query, decription) {
    try {
        const [rows] = await connection.query(query);
        console.log(`\n${decription}:`);
        console.table(rows);
    } catch (error) {
        console.error(" Error executing query:", error.message);
        console.error(error);
    }
}

// List of SQL queries with descriptions
const queries = [
    {
      description: "Countries with population greater than 8 million",
      query: "SELECT Name FROM country WHERE Population > 8000000;",
    },
    {
      description: "Countries that contain 'land' in their names",
      query: "SELECT Name FROM country WHERE Name LIKE '%land%';",
    },
    {
      description: "Cities with a population between 500,000 and 1,000,000",
      query: "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000;",
    },
    {
      description: "All countries in the continent 'Europe'",
      query: "SELECT Name FROM country WHERE Continent = 'Europe';",
    },
    {
      description: "Countries sorted by surface area (largest to smallest)",
      query: "SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC;",
    },
    {
      description: "All cities in the Netherlands",
      query: "SELECT Name FROM city WHERE CountryCode = 'NLD';",
    },
    {
      description: "Population of Rotterdam",
      query: "SELECT Population FROM city WHERE Name = 'Rotterdam';",
    },
    {
      description: "Top 10 countries by surface area",
      query: "SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10;",
    },
    {
      description: "Top 10 most populated cities",
      query: "SELECT Name, Population FROM city ORDER BY Population DESC LIMIT 10;",
    },
    {
      description: "Total world population",
      query: "SELECT SUM(Population) AS TotalPopulation FROM country;",
    },
  ];
  
  // Function to execute all the queries 
  async function executeQueries() {
    for (const { query, description } of queries) {
      await runQuery(query, description);
    }
    await connection.end();
  }
  
  // Run the function to execute queries 
  executeQueries();