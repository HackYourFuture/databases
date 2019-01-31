'use strict';
const mysql = require('mysql');
const util = require('util');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'bbs',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function homework() {
  connection.connect();

  try {
    //1
    const firstQuery = await execQuery(
      'select country_name, population from countries where population >= 8000000',
    );
    // console.log(firstQuery);

    // 2
    const secondQuery = await execQuery(
      "select country_name from countries where country_name like '%land%'",
    );
    // console.log(secondQuery);

    // 3
    const thirdQuery = await execQuery(
      'select city_name, population from cities where population >= 500000 and population <= 1000000',
    );
    // console.log(thirdQuery);

    // 4
    const fourthQuery = await execQuery(
      'select country_name, continent from countries where continent = "Europe"',
    );
    // console.log(fourthQuery);

    // 5
    const fifthQuery = await execQuery(
      'select country_name, surface from countries order by surface desc',
    );
    // console.log(fifthQuery);

    // 6
    const sixthQuery = await execQuery('select city_name from cities where country_id = 2');
    // console.log(sixthQuery);

    // 7
    const seventhQuery = await execQuery(
      'select population as "Population of Rotterdam" from cities where country_id = 2 and city_name = "Rotterdam" ',
    );
    // console.log(seventhQuery);

    // 8
    const eighthQuery = await execQuery(
      'select country_name, surface from countries order by surface desc limit 10',
    );
    // console.log(eighthQuery);

    // 9
    const ninthQuery = await execQuery(
      'select city_name, population from cities order by population desc limit 10',
    );
    // console.log(ninthQuery);

    // 10
    const tenthQuery = await execQuery(
      'select sum(population) as "Total world population" from countries',
    );
    // console.log(tenthQuery);
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

homework();
