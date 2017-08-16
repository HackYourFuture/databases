var fs = require('fs');
var mysql = require('mysql');

var config = JSON.parse(fs.readFileSync("config-secret.json"))
  
var connection = mysql.createConnection({
 	  host: config.host,
  	user: config.user,
  	password: config.password,
  	port: config.port,
    database: config.database
});
  
   
const sqlStatments=[
        `INSERT INTO todos (Done, Name, StatusId, Due) VALUES (1, 'Review SCSS', 1,'2017-08-17 00:00:00')`,
        `UPDATE todos SET Name='HTML5' WHERE Id=25`,
        `UPDATE todos SET StatusId=(select Id FROM statuses WHERE Name='Completed') WHERE Id=27`,
        `DELETE FROM todos WHERE Id=27`,
        `DELETE FROM todos WHERE Id=28`   
      ];
     
let sqlResuls = sqlStatments.map(function(value) {
       
      connection.query(value, function(error, results, fields) {
        if(error) {console.log("error :"+ error)}else {
          console.log(results);
          console.log("=========================================================");
       
        }
          
      })
    });
 connection.end();