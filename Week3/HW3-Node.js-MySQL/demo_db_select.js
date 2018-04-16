 var mysql = require('mysql');
var con = mysql.createConnection({
 host: "localhost",
  user: "",
 password: "",
  database: "mydb"
});
con.connect(function(err) {
 if (err) throw err;
 con.query("SELECT * FROM customers", function (err, result, fields) {
 if (err) throw err;
    console.log(result);
  });
}); 
