const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tarek123321",
    database: "world",
});

// using the database world
db.query("USE world;", (err, results) => {
    if (err) {
        console.log(err);
    }
    console.log("database world used");
});

// function to query the data from data base using query parameter, to answer the quiestion parameter .
const queringAnswersFromDb = function (queriesList, question) {
    queriesList.forEach((query, index) => {
        db.query(query, (err, results) => {
            console.log(question[index]);
            console.log("Answer is:", results);
        });
    });
};

const listOfQueries = [
    "SELECT Name FROM world.country WHERE Population > 8000000; ",
    " SELECT Name FROM world.country WHERE Name LIKE '%land%';",
    "SELECT Name FROM world.country WHERE Population BETWEEN 500000 AND 1000000;",
    "SELECT Name FROM world.country WHERE Continent = 'Europe';",
    " SELECT Name AS Names_Of_Largest_Cities FROM world.country ORDER BY SurfaceArea DESC;",
    " SELECT Name as DutchCities FROM world.city WHERE CountryCode = 'NLD';",
    " SELECT Population as PopulationOfRotterdam FROM world.city WHERE Name = 'Rotterdam';",
    " SELECT Name AS BiggestCountries , SurfaceArea FROM world.country ORDER BY SurfaceArea DESC LIMIT 10;",
    " SELECT Name FROM world.city ORDER BY Population DESC LIMIT 10; ",
    " SELECT SUM(Population) AS World_Population FROM world.country;",
];

const listOfQuestions = [
    "What are the names of countries with population greater than 8 million?",
    "What are the names of countries that have “land” in their names?",
    "What are the names of the cities with population in between 500,000 and 1 million?",
    "What's the name of all the countries on the continent ‘Europe’?",
    "List all the countries in the descending order of their surface areas.",
    "What are the names of all the cities in the Netherlands?",
    "What is the population of Rotterdam?",
    "What's the top 10 countries by Surface Area?",
    "What's the top 10 most populated cities?",
    "What is the population number of the world?",
];

queringAnswersFromDb(listOfQueries, listOfQuestions);

db.end((err) => {
    console.log("connection ended");
});
