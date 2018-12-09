var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'class17'
});

connection.connect();

const queryList = [];
const questions = [];
questions[0] = "What are the names of countries with population greater than 8 million";
queryList[0] = "select * from countries where population>8000000";

questions[1] = "What are the names of countries that have “land” in their names ? ";
queryList[1] = "select country_name from countries where country_name LIKE '%land%'";

questions[2] = "What are the names of the cities with population in between 500, 000 and 1 million ? ";
queryList[2] = "select city_name from cities where(population > 500000 and population < 1000000)";

questions[3] = "What's the name of all the countries on the continent 'Europe' ?";
queryList[3] = "select country_name from countries where continent = 'Europe'";

/*questions[4] = "List all the countries in the descending order of their surface areas.";
queryList[4] = "select city_name from cities ORDER BY population DESC";

questions[5] = "What are the names of all the cities in the Netherlands ? ";
queryList[5] = "select city_name from cities, countries where countries.country_name = 'Nederland' and countries.country_number = cities.country_number";

questions[6] = "What is the population of Rotterdam ? ";
queryList[6] = "select population from cities where city_name = 'Rotterdam'";

questions[7] = "What's the top 10 countries by Surface Area ?";
queryList[7] = "select country_name from countries ORDER BY population desc LIMIT 10";

questions[8] = "What's the top 10 most populated cities?";
queryList[8] = "select city_name from cities ORDER BY population desc LIMIT 10";

questions[9] = "What is the population of the world ?";
//All cities are not entered. I assummed that countries form the world.
queryList[9] = "select sum(population) from countries";
*/
for (let i = 0; i < queryList.length; i++) {
  runQueries(queryList[i], questions[i]);
}
function runQueries(query, question) {
  connection.query(query, function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log("----------------------------------");
    console.log(question);
    console.log("--------------");
    let x = 1;
    results.forEach(element => {
      console.log(x + ". reply is ", element);
      x++;
    });
    console.log("----------------------------------");
  });

}




connection.end();
