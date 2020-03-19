var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'ammar_week2_database'
});



connection.connect();


const create_table = 
`create table Authors (
  author_no int NOT NULL AUTO_INCREMENT,
  author_name varchar(50),
  university varchar(50), 
  date_of_birth date, 
  h_index int, 
  gender enum('m' , 'f', 'non'),
  friend int REFERENCES authors (author_no),
  PRIMARY KEY(author_no))` ;

connection.query( create_table, function (error, result, fields) {
    if (error) {
        throw error;
    }
    console.log(`The reply is`, result);
})

connection.end();