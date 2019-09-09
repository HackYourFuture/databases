var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',

});
 
 
connection.connect(function(err) {
    var myWorld = "CREATE DATABASE myWorld";
    if (err) throw err;
    console.log("Connected!");
    connection.query(myWorld, function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
    connection.end();
  });
 