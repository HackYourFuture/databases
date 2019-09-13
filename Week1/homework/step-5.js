const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'newWorld',
});

var Request = require('request');

Request.get('https://restcountries.eu/rest/v2/all', (error, response, body) => {
  con.connect();

  let create_query = [
    `create table newBigworld (name varchar(250),countryCode varchar(60) ,capital varchar(250),continent varchar(30),population int,area int)`,
  ];
  let values_query = [];
  let select_query = [
    `select name from newBigworld where population>=8000000`, //4.1
    `select name from newBigworld where name LIKE '%land%'`, //4.2
    `select name from newBigworld where continent = 'Europe'`, //4.4
    `select * from newBigworld order by area DESC`, //4.5
    `select name,area from newBigworld order by area DESC limit 10`, //5.3
    `select name,population from newBigworld order by population DESC limit 10`, //5.4
    `SELECT SUM(population) AS worldPopulation FROM newBigworld`, //5.5
  ];
  if (error) {
    return console.dir(error);
  }
  const data = JSON.parse(body);
  data.forEach(element => {
    values_query.push(
      `insert into newbigworld values("${element.name}","${element.alpha3Code}","${element.capital}","${element.region}",${element.population},${element.area})`,
    );
  });
  let queries = create_query.concat(values_query).concat(select_query);
  queries.forEach((query, index) => {
    con.query(query, function (error, results, fields) {
      console.log('Going to run ', query);
      if (error) {
        throw error;
      }
      if (index >= queries.length - 7) {
        for (i in results) {
          console.log(results[i]);
        }
      }
    });
  });

  con.end();
});