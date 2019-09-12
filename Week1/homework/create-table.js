const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'newWorld'
});

con.connect();

const create_query = [
  "create table country (name varchar(50), continent varchar(50), region varchar(50), surfacearea int, indepyear int,population int,lifeexpectancy int,gnp int,gnpold int,localname varchar(50),govermentform varchar(50),headofstate varchar(50),capital varchar(50))",
  "create table city (id int, name varchar(50), countrycode varchar(10), district varchar(50),population int )"
]

create_query.forEach(query => {
  con.query(query, function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log(`country and city tables created`);
  });
})

con.end();