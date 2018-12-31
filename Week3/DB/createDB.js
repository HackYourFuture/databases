var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: 'class17'
});

connection.connect();

connection.query("DROP DATABASE IF EXISTS ToDoDB", function (error, results, fields) {
  if (error) throw error;
  console.log("Database dropped.");
});
connection.query("CREATE DATABASE IF NOT EXISTS ToDoDB", function (error, results, fields) {
  if (error) throw error;
  console.log("Database created.");
});
connection.query("use ToDoDB", function (error, results, fields) {
  if (error) throw error;
  console.log("ToDoDB is selected.");
});
connection.query("CREATE TABLE IF NOT EXISTS categories (id int, name varchar(50), PRIMARY KEY (id))", function (error, results, fields) {
  if (error) throw error;
  console.log("Categories table is created.");
});
connection.query("CREATE TABLE IF NOT EXISTS reminders (id int, name varchar(50), reminderStartDate date, reminderEndDate date, PRIMARY KEY(id))", function (error, results, fields) {
  if (error) throw error;
  console.log("Reminders table is created.");
});
connection.query("CREATE TABLE IF NOT EXISTS tags (id int, name varchar(50), PRIMARY KEY(id))", function (error, results, fields) {
  if (error) throw error;
  console.log("Tags table is created.");
});
connection.query("CREATE TABLE IF NOT EXISTS lists (id int, name varchar(50), categoryId int, reminderId int,PRIMARY KEY(id), FOREIGN KEY(categoryId) REFERENCES categories(id), FOREIGN KEY(reminderId) REFERENCES reminders(id))", function (error, results, fields) {
  if (error) throw error;
  console.log("Lists table is created.");
});
connection.query("CREATE TABLE IF NOT EXISTS Users (id int, name varchar(50),surname varchar(50), username varchar(50), password varchar(50), email varchar(50), tel varchar(16), PRIMARY KEY(id))", function (error, results, fields) {
  if (error) throw error;
  console.log("Users table is created.");
});
connection.query("CREATE TABLE IF NOT EXISTS ToDoItems (id int, name varchar(50),description varchar(50), listId int, isCompleted boolean, tagId int, PRIMARY KEY(id), FOREIGN KEY(listId) REFERENCES lists(id), FOREIGN KEY(tagId) REFERENCES tags(id))", function (error, results, fields) {
  if (error) throw error;
  console.log("ToDoItems table is created.");
});
connection.query("CREATE TABLE IF NOT EXISTS UsersCatalogs (id int, userId int,categoryId int, readRight boolean, writeRight boolean, PRIMARY KEY(id), FOREIGN KEY(userId) REFERENCES users(id), FOREIGN KEY(categoryId) REFERENCES categories(id))", function (error, results, fields) {
  if (error) throw error;
  console.log("UsersCatalogs table is created.");
});
connection.end();


/*

console.log("Connected!");
const queryDropDB = 'DROP DATABASE IF EXISTS world2';
const queryCreateDB = 'CREATE DATABASE IF NOT EXISTS world2';
const queryUseDB = 'USE world2';
const create_query_countries = "CREATE TABLE IF NOT EXISTS countries (country_number int, country_name varchar(50), country_surface double, population double, continent enum('Asia','Europe','North America','Africa','Oceania','Antarctica','South America'), PRIMARY KEY (country_number)) ";
const create_query_cities = "CREATE TABLE IF NOT EXISTS cities (city_number int, city_name varchar(50), population bigint, country_number int, PRIMARY KEY (city_number))";

runQueries(queryDropDB);
runQueries(queryCreateDB);
runQueries(queryUseDB);
runQueries(create_query_countries);
runQueries(create_query_cities);



function runQueries(query) {
  console.log('FUNCTION!!!!!');
  connection.query(query, function (error, results, fields) {
    console.log('Query: ' + query);
    console.log('The solution is: ', results[0]);
    if (err) throw err;
    //await result[0];
    console.log('The solution is: ', results[0]);
  });
}*/

//connection.connect();


//connection.end();
