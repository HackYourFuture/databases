const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'world',
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected...');
});

// Create tables country / city
const tables = [
  "CREATE TABLE IF NOT EXISTS country (ID int auto_increment primary key, Name varchar(50), Continent enum('Asia','Europe', 'North America', 'Africa','Oceania', 'Antarctica', 'South America'), Region varchar(50), SurfaceArea float, IndepYear int, Population int, LifeExpectancy float, GNP float, GNPOld float, LocalName varchar(50), GovernmentForm varchar(50), HeadOfState varchar(50), Capital varchar(50))",
  'CREATE TABLE IF NOT EXISTS city (ID int auto_increment primary key, Name varchar(50), CountryCode varchar(50), District varchar(50), Population int)',
];
for (let i in tables) {
  connection.query(tables[i], function(err, results, fields) {
    if (err) console.log(`message: ${err}`);
    console.log('Tables of country and city are created');
  });
}

connection.end();
