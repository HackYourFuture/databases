const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'newWorld'
});

con.connect();

const select_query = [
  "select name from country where population>=8000000", // 4/i
  "select name from country where name LIKE '%lands'", //4/ii
  "select name from city where population>=500000 and population<= 1000000", //4/iii
  "select name from country where continent ='Europe' ", //4/iv
  "select name,surfacearea from country ORDER BY surfacearea DESC", // 4/v
];

select_query.forEach(query => {
  con.query(query, function (error, results, fields) {
    console.log("Going to run ", query)
    if (error) {
      throw error;
    }
    for (i in results) {
      console.log(results[i]);
    }
  });
});
con.end();