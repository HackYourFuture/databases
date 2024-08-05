var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword"
  // database : 'company',
  // port : 3306
});

connection.connect();

const createDatabaseQuery = "CREATE DATABASE IF NOT EXISTS company";
connection.query(createDatabaseQuery, function (error, results, fields) {
  if (error) throw error;
  console.log("Database 'company' created or already exists.");

  const useDatabaseQuery = "USE company";
  connection.query(useDatabaseQuery, function (error, results, fields) {
    if (error) throw error;
    console.log("Using 'company' database.");

    var create_query =
      "CREATE TABLE IF NOT EXISTS projects (project_id int, project_name varchar(50), start_date date, manager varchar(50))";

    connection.query(create_query, function (error, results, fields) {
      if (error) throw error;
      console.log("Table 'projects' created or already exists.");

      connection.end();
    });
  });
});
