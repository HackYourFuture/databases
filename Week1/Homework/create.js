var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

connection.connect();

var create_database_queries = 'create database if not exists world';

console.log('going to start the create database statement ', create_database_queries);
connection.query(create_database_queries, function(error, results, fields) {
  if (error) {
    throw error;
  }
  console.log('the reply is ', results[0]);
});
connection.end();

/*
*
create the tables
*
*
*/

connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

connection.connect();

var create_queries = [
  'create table if not exists continent(Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,name varchar(30) Not null)',
  'create table if not exists Country(Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,name varchar(30) Not null,population INT Not null,service_area INT Not null, continentID int not null,FOREIGN KEY (continentID) REFERENCES continent(Id))',
  'create table if not exists City(Id int not null auto_increment primary key,name varchar(30) not null,population int not null,countryID int not null,Foreign Key (countryID) references Country(ID))',
];
//"create table teachers (teacher_number int, teacher_name varchar(50), date_of_birth date, subject text, gender enum('m', 'f'))"

for (var query of create_queries) {
  console.log('going to start the create statement ', query);
  connection.query(query, function(error, results, fields) {
    if (error) {
      //console.error(error);
      throw error;
    }
    console.log('the reply is ', results[0]);
  });
}
connection.end();
