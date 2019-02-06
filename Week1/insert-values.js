const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week1'
});

connection.connect();

let insert_queries = [
  "insert into country values('Nigeria' , 173615000 , 'Africa' , 923768 )",
  "insert into country values('Germany' , 80619000 , 'Europe' , 357022 )",
  "insert into country values('Neatherlands' , 16842200 , 'Europe' , 41528 )",
  "insert into country values('Maldives' , 317280 , 'Asia' , 298 )",
  "insert into country values('India' , 1241610000 , 'Asia' , 3287260 )",
  "insert into country values('France' , 65844000 , 'Europe' , 551500 )",
  "insert into country values('Denmark' , 5627235 , 'Europe' , 43094 )",
  "insert into country values('Canada' , 35295770 , 'North America' , 9970610 )",
  "insert into country values('Brazil' , 201032714 , 'South America' , 8514880 )",
  "insert into country values('Argentina' , 41660096 , 'South America' , 2780400 )",

  "insert into city values('Amsterdam' , 741636 , 'Netherlands')",
  "insert into city values('Rotterdam' , 598199 , 'Netherlands')",
  "insert into city values('the Huge' , 474292 , 'Netherlands')",
  "insert into city values('Cairo' , 19128000 , 'Egypt')",
  "insert into city values('Munich' , 1330440 , 'Germany')",
  "insert into city values('Doha' , 344939 , 'Qatar')",
  "insert into city values('Tokyo' , 8336599 , 'Japan')",
  "insert into city values('Los Angeles' , 3971883 ,'Usa')",
  "insert into city values('Basel' , 164488 , 'SwitzerLand')",
  "insert into city values('Lublin' , 360044 , 'Polen')",
]

for (let i in insert_queries) {
  console.log("Going to run ", insert_queries = [i])
  connection.query(insert_queries[i], function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log("the reply is ", results[0]);
  });
}
connection.end();
