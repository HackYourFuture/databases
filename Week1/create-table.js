const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week1'
});

connection.connect();

// connection.query('CREATE DATABASE week1', function (error, results, fields) {
//   if (error) throw error;
//   console.log('the reply is: ', results);
// });

// connection.query('use week1', function (error, results, fields) {
//   if (error) throw error;
//   console.log("the reply is :" + results);
// });

const create_query = ['CREATE TABLE country(Name varchar(255), population int(11), continent varchar(255), surfaceArea int(11))',
  'CREATE TABLE city(Name varchar(255), population int(11), Country varchar(255))'];
connection.query(create_query, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log("the reply is ", results[0]);
});
connection.end();
