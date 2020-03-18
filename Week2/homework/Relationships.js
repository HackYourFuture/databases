var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'ammar_week2_database'
});



connection.connect();


const create_table = 
`create table Research_Papers (
    paper_id int, 
    paper_title varchar(50),
    conference varchar(50),
    publish_date date)` ;

connection.query( create_table, function (error, result, fields) {
    if (error) {
        throw error;
    }
    console.log(`The reply is`, result);
})

connection.end();