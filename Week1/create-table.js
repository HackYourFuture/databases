var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'company',
  // port : 3307
});

connection.connect();

var create_query = "create table projects (project_id int, project_name varchar(50), start_date date, manager varchar(50))"

connection.query(create_query, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("the reply is ", results[0]);
});
connection.end();
