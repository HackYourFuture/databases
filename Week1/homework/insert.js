const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'newWorld'
});

con.connect();

const country_values = [
  "insert into  country values ( 'Netherlands','Europe','Western Europe',42508, 1945, 17000000,82,901,890,'Nederlands','parliamentary','Willem-Alexander','Amsterdam')",
  "insert into country values ( 'Saudi Arabia','Asia','Western Asia',2149690, 1932, 32248200,74,1800,1790,'Assaudia','kingdom','Salman','Riyadh')",
  "insert into country values ( 'Afghanistan','Asia','Southern Asia',652230, 1919, 27657145,64,20,20,'Afghanistan','republic','Ashraf Ghani','Kabul')",
];

country_values.forEach(query => {
  con.query(query, function (error, results, fields) {
    if (error) {
      throw error;
    }
  });
})

const city_values = [
  "insert into  city values (1,'Amsterdam','NL','NorthHolland',863202 )",
  "insert into  city values (2,'Apeldoorn','NL','Gelderland',162456 )",
  "insert into  city values (3,'Haarlem','NL','NorthHolland',161213 )",
  "insert into  city values (4,'Haarlemmermeer','NL','NorthHolland',154223 )",
  "insert into  city values (5,'Arnhem','NL','Gelderland',159277 )",
  "insert into  city values (6,'Rotterdam','NL','SouthHolland',644527 )",
  "insert into  city values (7,'Utrecht','NL','Utrecht',231649 )",
  "insert into  city values (8,'Zwolle','NL','Overijssel',127492 )",

];

city_values.forEach(query => {
  con.query(query, function (error, results, fields) {
    if (error) {
      throw error;
    }
  });
})

con.end();