const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword"
});

con.connect();
con.query("CREATE DATABASE newWorld", function (err, result) {
  if (err) throw err;
  console.log("Database created");
});
con.end();