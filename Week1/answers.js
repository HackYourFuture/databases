const mysql = require('mysql');
const util = require('util');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week1'
});

const execQuery = util.promisify(connection.query.bind(connection));


async function answers() {
  connection.connect();


  try {
    const answer1 = await execQuery(
      'select name from country where population > 8000000'
    );
    console.log(answer1)
    const answer2 = await execQuery(
      'select name from country where name like "%land%"'
    );
    console.log(answer2)
    const answer3 = await execQuery(
      'select name from city where population >= 500000 and population <= 1000000'
    );
    console.log(answer3)
    const answer4 = await execQuery(
      'select name from country where continent = "Europe" '
    );
    console.log(answer4)
    const answer5 = await execQuery(
      'select name from country order by surfaceArea desc'
    );
    console.log(answer5);
    const answer6 = await execQuery(
      'select name from city where country = "Netherlands"'
    );
    console.log(answer6);
    const answer7 = await execQuery(
      'select population from city where name = "Rotterdam"'
    );
    console.log(answer7);
    const answer8 = await execQuery(
      'select name from country order by surfaceArea desc limit 10'
    );
    console.log(answer8);
    const answer9 = await execQuery(
      'select name from city order by population desc limit 10'
    );
    comsole.log(answer9)
    const answer10 = await execQuery(
      'select sum(population) from country'
    );
    console.log(answer10);


  } catch (error) {
    console.log(error);
  }
  connection.end();
}

answers();