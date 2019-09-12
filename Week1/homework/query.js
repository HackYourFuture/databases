const pool = require('./connectDatabase').pool;

class Result {
  async answer(query, ques) {
    try {
      const q = query;
      const results = await pool.query(q);
      console.log(ques);
      results.forEach(result => {
        console.log(JSON.parse(JSON.stringify(result)));
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
}

const result = new Result();

/// Questions

const q1 = '1. What are the names of the countries with population greater than 8 million';
const qu1 = 'SELECT Name, Population FROM countries WHERE population > 8000000 ORDER BY Population';
const q2 = '2. What are the names of the countries that have “land” in their names ?';
const qu2 = 'SELECT Name FROM countries WHERE Name LIKE "%land%"';
const q3 = '3. What are the names of the cities with population in between 500,000 and 1 million ?';
const qu3 =
  'SELECT Name, Population FROM cities WHERE Population BETWEEN 500000 AND 1000000 ORDER BY Population';
const q4 = '4. What are the names of all the countries on the continent ‘Europe’ ?';
const qu4 = 'SELECT Name, Continent FROM countries WHERE Continent="Europe" ORDER BY Name';
const q5 = '5. List all the countries in the descending order based on their surface areas.';
const qu5 = 'SELECT Name, SurfaceArea FROM countries ORDER BY SurfaceArea DESC';
const q6 = '6. What are the names of all the cities in the Netherlands?';
const qu6 =
  'SELECT Name FROM cities WHERE CountryCode IN (SELECT Code FROM countries WHERE Name = "Netherlands")';
const q7 = "7. What's the population of Rotterdam?";
const qu7 = 'SELECT Name, Population FROM cities WHERE Name = "Rotterdam"';
const q8 = "8. What's the top 10 countries based on surface area?";
const qu8 = 'SELECT Name, SurfaceArea FROM countries ORDER BY SurfaceArea DESC LIMIT 10';
const q9 = "9. What's the top 10 cities with the highest population?";
const qu9 = 'SELECT Name, Population FROM cities ORDER BY Population DESC LIMIT 10';
const q10 = "10. What's the population of the world ?";
const qu10 = 'SELECT SUM(Population) AS World_Population FROM countries';
const q11 = '11. What are the largest populated countries in each continents';
const qu11 =
  'SELECT Name, Population, Continent FROM countries WHERE Population IN (SELECT MAX(Population) FROM countries WHERE Population > 1 GROUP BY Continent)';

const queries = [qu1, qu2, qu3, qu4, qu5, qu6, qu7, qu8, qu9, qu10, qu11];
const questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11];
module.exports = { result, queries, questions };
