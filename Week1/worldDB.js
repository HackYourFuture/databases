import mysql from 'mysql2';
//create connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'hello_worldismine'
});

//What are the names of countries with population greater than 8 million?
connection.query("SELECT name FROM country WHERE population > 8000000", function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("the reply is ", results);
});

//What are the names of countries that have “land” in their names?
connection.query("SELECT name FROM country WHERE name LIKE '%land%'", function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("the reply is ", results);
});
//What are the names of the cities with population in between 500,000 and 1 million?
connection.query("SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000", function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("the reply is ", results);
});
//What's the name of all the countries on the continent ‘Europe’?
connection.query("SELECT name FROM country WHERE continent = 'Europe'", function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("the reply is ", results);
});
//List all the countries in the descending order of their surface areas.
connection.query("SELECT name FROM country ORDER BY surface_area DESC", function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("the reply is ", results);
});
//What are the names of all the cities in the Netherlands?
connection.query("SELECT name FROM city WHERE country_code = 'NLD'", function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("the reply is ", results);
});
//What is the population of Rotterdam?
connection.query("SELECT population FROM city WHERE name = 'Rotterdam'", function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("the reply is ", results);
});
//What's the top 10 countries by Surface Area?
connection.query("SELECT name FROM country ORDER BY surface_area DESC LIMIT 10", function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("the reply is ", results);
});
//What's the top 10 most populated cities?
connection.query("SELECT name FROM city ORDER BY population DESC LIMIT 10", function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("the reply is ", results);
});
//What is the population number of the world?
connection.query("SELECT SUM(population) FROM country", function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("the reply is ", results);
});