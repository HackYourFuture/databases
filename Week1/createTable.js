const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  insecureAuth: true,
});

connection.connect();

connection.query('USE myWorld;', error => {
  if (error) throw error;
  console.log(`you accessed the database 'myWorld'`);
});

const tablesCountry = [
  `CREATE TABLE IF NOT EXISTS countries ( ID int auto_increment primary key,
    Name VARCHAR(254),Continent enum('Asia', 'Africa', 'North America', 'South America', 'Oceania', 'Europe', 'Antarctica'),
    Region VARCHAR(254),
    SurfaceArea float,IndepYear int,Population int,
    LifeExpectancy float,GNP float,GNPOld float,
    LocalName VARCHAR(254),GovernmentForm VARCHAR(254),
    HeadOfState VARCHAR(254),Capital VARCHAR(254), CONSTRAINT uniq_info_ UNIQUE (Name) )`,

  'CREATE TABLE IF NOT EXISTS cities (ID int auto_increment primary key,Name VARCHAR(254),CountryCode VARCHAR(3),District VARCHAR(254),Population int, CONSTRAINT uniq_info UNIQUE (Name, CountryCode ))',
];

tablesCountry.forEach(table => {
  connection.query(table, (error, results, fields) => {
    if (error) {
      throw error;
      console.log('the tables were created');
    }
  });
});

connection.end();
