const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        // Read the SQL file to get the SQL commands
        const sqlFilePath = path.join(__dirname, 'databases', 'world.sql');
        const sqlCommands = fs.readFileSync(sqlFilePath, 'utf8');

        // Create a connection to the database
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'hyfuser',
            password: 'hyfpassword',
            database: 'new_world',
            multipleStatements: true
        });

        console.log('Connected to the database');

        // Create the database and tables
        await connection.query(sqlCommands);
        console.log('Database and tables created successfully');

        // Define all the queries
        const queries = [
            { name: 'Countries with population greater than 8 million', query: 'SELECT name FROM country WHERE population > 8000000' },
            { name: 'Countries with "land" in their names', query: 'SELECT name FROM country WHERE name LIKE "%land%"' },
            { name: 'Cities with population between 500,000 and 1 million', query: 'SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000' },
            { name: 'Countries in Europe', query: 'SELECT Name FROM country WHERE Continent = "Europe"' },
            { name: 'Countries by surface area (descending)', query: 'SELECT Name FROM country ORDER BY SurfaceArea DESC' },
            { name: 'Cities in the Netherlands', query: 'SELECT Name FROM city WHERE CountryCode = "NLD"' },
            { name: 'Population of Rotterdam', query: 'SELECT Population FROM city WHERE Name = "Rotterdam"' },
            { name: 'Top 10 countries by surface area', query: 'SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10' },
            { name: 'Top 10 most populated cities', query: 'SELECT Name FROM city ORDER BY Population DESC LIMIT 10' },
            { name: 'Total world population', query: 'SELECT SUM(Population) AS WorldPopulation FROM country' }
        ];

        // Execute each query sequentially
        for (const { name, query } of queries) {
            const [results] = await connection.query(query);
            console.log(`${name}:`, results);
        }

        // Close the connection after all queries are done
        await connection.end();
        console.log('Connection closed');
    } catch (err) {
        console.error('Error:', err.message);
    }
}

main();
