const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'zehra',
  password: '123456',
  database: 'zehradb',
});

connection.connect(err => {
  if (err) {
    console.error('An error occurred while connecting to the DB');
    throw err;
  }
});

const queries = [
  'CREATE DATABASE world',
  'USE world',
  "CREATE TABLE country (Name varchar(60), Continent  enum('Asia' , 'Europe' , 'North America', 'Africa', 'Oceania', 'Antarctica', 'South America'), Region varchar(30), SurfaceArea int, IndepYear smallint(6), Population int, LifeExpectancy float(3,1), GNP float(10,2), GNPOld float(10,2), LocalName varchar(45), GovernmentForm varchar(45), HeadOfState varchar(60), Capital varchar(50))",
  'CREATE TABLE city (ID int(11), Name varchar(35), CountryCode varchar(3), District varchar(20), Population int(11))',
  "INSERT INTO country VALUES ('Netherlands', 'Europe', 'Western Europe',  41526.00, 1581, 15864000, 78.3, 371362, 360478.00, 'Nederland', 'Constitutional Monarchy', 'Beatrix', 'Amsterdam')",
  "INSERT INTO country VALUES ('United States', 'North America', 'North America',   9363520.00, 1976,  278357000, 77.1,  8510700.00,  8110900.00, 'United States', 'Federal Republic', 'George W. Bush', 'Washington D.C.')",
  "INSERT INTO country VALUES ('Japan', 'Asia', 'Eastern Asia', 377829.00, -660, 126714000, 80.7, 3787042.00, 4192638.00, 'Nihon/Nippon', 'Constitutional Monarchy', 'Akihito','Tokyo')",
  "INSERT INTO country VALUES ('Turkey', 'Asia', 'Middle East',  774815.00, 1923, 80810525, 71.0,  210721.00,  189122.00, 'Turkiye', 'Republic', 'Ahmet Necdet Sezer', 'Ankara')",
  "INSERT INTO country VALUES ('Spain', 'Europe', 'Europe', 520000.00, 1807, 46441049, 78.8,  553233.00,  532031.00, 'España', 'Constitutional monarchy', ' Juan Carlos', 'Madrid')",
  "INSERT INTO country VALUES ('Canada', 'North America', 'North America', 9985000.00, 1867, 37279811, 79.4, 598862.00,  625626.00 , 'Canada', 'Constitutional monarchy', 'Elizabeth II', 'Toranto')",
  "INSERT INTO country VALUES ('Italy', 'Europe', 'Southern Europe', 301316.00, 1861, 57680000, 79.0, 1161755.00, 1145372.00, 'Italia', 'Republic', 'Carlo Azeglio Ciampi', 'Roma')",
  "INSERT INTO country VALUES ('Argentina', 'South America', 'South America', 2780400.00, 1816, 37032000, 75.1, 340238.00, 323310.00, 'Argentina', 'Federal Republic', 'Fernando de la Ria','Buenos Aires')",
  "INSERT INTO country VALUES ('Nigeria', 'Africa', 'Western Africa',  923768.00, 1960,  111506000, 51.6,  65707.00 ,  58623.00 , 'Nigeria', 'Federal Republic', ' Olusegun Obasanjo','Abuja')",
  "INSERT INTO country VALUES ('Georgia', 'Asia', 'Middle East',   69700.00, 1991, 4968000 , 64.5,  6064.00 ,  5924.00 , 'Skartvelo', 'Republic', 'Eduard Âlevardnadze','Tiflis')",
  "INSERT INTO country VALUES ('Hong Kong', 'Asia', 'Eastern Asia',  1075.00, null , 6782000 , 79.5,  166448.00 , 173610.00 , 'Xianggang/Hong', 'Special Administrative', 'Jiang Zemin','Hong Kong')",
  "INSERT INTO country VALUES ('Peru', 'South America', 'South America', 1285216.00, 1821 ,  25662000 , 70.0, 64140.00 , 65186.00 , 'Piruw', 'Republic', 'Valentin Paniagua Corazao','Lima')",
  "INSERT INTO city VALUES (1,'Amsterdam', 'NLD', 'Noord-Holland', 731200)",
  "INSERT INTO city VALUES (2,'Rotterdam', 'NLD', 'Zuid-Holland',  593321)",
  "INSERT INTO city VALUES (3,'Buenos Aires', 'ANG', 'Distrito Federal', 2982146)",
  "INSERT INTO city VALUES (4,'Newcastle', 'AUS', 'New South Wales', 270324)",
  "INSERT INTO city VALUES (5,'Gent', 'BEL', 'East Flanderi',  224180)",
  "INSERT INTO city VALUES (6,'Istanbul', 'TUR', 'Marmara', 8787958)",
  "INSERT INTO city VALUES (7,'Izmir', 'TUR', 'Ege',  2130359)",
  "INSERT INTO city VALUES (8,'Kayseri', 'TUR', 'Central Anatolia', 475657)",
  "INSERT INTO city VALUES (9,'Sevastopol', 'UKR', 'Kirim', 348000)",
  "INSERT INTO city VALUES (10,'Barcelona', 'VEN', 'Anzoitegui', 322267)",
  "INSERT INTO city VALUES (11,'Valencia', 'VEN', ' Carabobo', 794246)",
  "INSERT INTO city VALUES (12,'Kazan', 'Rus', 'Tataristan',  1101000)",
];

const selectQueries = [
  'SELECT Name, Population FROM country WHERE Population > 8000000',
  "SELECT Name FROM country WHERE Name LIKE '%land%'",
  'SELECT Name, Population FROM city WHERE Population BETWEEN 500000 AND 1000000',
  "SELECT Name FROM country WHERE Continent = 'Europe'",
  'SELECT Name,  SurfaceArea FROM country ORDER BY SurfaceArea DESC',
  "SELECT Name, CountryCode FROM city WHERE CountryCode = 'NLD'",
  "SELECT Name, Population FROM city WHERE Name = 'Rotterdam'",
  'SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10',
  'SELECT Name, Population FROM city ORDER BY Population DESC LIMIT 10',
  'SELECT SUM(Population) FROM country',
];

for (let i in queries) {
  connection.query(queries[i], function(error, results, fields) {
    if (error) {
      throw error;
    }
  });
}
for (let i in selectQueries) {
  console.log('Going to run ', selectQueries[i]);
  connection.query(selectQueries[i], function(error, results, fields) {
    if (error) {
      throw error;
    }
    console.log('the reply is ', results);
  });
}

connection.end();
