var mysql = require('mysql');
var con = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected to world database!');
});

var create_queries = [
  'CREATE DATABASE world',
  'USE world',
  'CREATE TABLE country (Name VARCHAR (40) NOT NULL UNIQUE,Continent ENUM("Asia", "Europe", "North America", "Africa", "Oceania", "Antarctica", "South America") DEFAULT "Asia",Region VARCHAR(40) NULL, SurfaceArea INT, IndepYear SMALLINT, Population INT (40) NOT NULL DEFAULT "0",LifeExpectancy FLOAT(4, 1),GNP FLOAT(10,2),GNPOld FLOAT(10,2), LocalName VARCHAR (40),GovernmentForm VARCHAR (30) NULL, HeadOfState VARCHAR(30),Capital VARCHAR(30),PRIMARY KEY (Name))',
  'CREATE TABLE city (ID INT NOT NULL,Name VARCHAR (40) NOT NULL,CountryCode VARCHAR (5),District  VARCHAR(50),  Population INT (40),PRIMARY KEY (ID))',
];

var insert_queries = [
  "INSERT INTO country VALUES ('United States', 'North America', 'North America',   9363520.00, 1976,  278357000, 77.1,  8510700.00,  8110900.00, 'United States', 'Federal Republic', 'George W. Bush', 'Washington D.C.')",
  "INSERT INTO country VALUES ('Netherlands', 'Europe', 'Western Europe',  41526.00, 1581, 15864000, 78.3, 371362, 360478.00, 'Netherlands', 'Constitutional Monarchy', 'Beatrix', 'Amsterdam')",
  "INSERT INTO country VALUES ('Japan', 'Asia', 'Eastern Asia', 377829.00, -660, 126714000, 80.7, 3787042.00, 4192638.00, 'Nihon/Nippon', 'Constitutional Monarchy', 'Akihito','Tokyo')",
  "INSERT INTO country VALUES ('Spain', 'Europe', 'Europe', 520000.00, 1807, 46441049, 78.8,  553233.00,  532031.00, 'España', 'Constitutional monarchy', ' Juan Carlos', 'Madrid')",
  "INSERT INTO country VALUES ('Canada', 'North America', 'North America', 9985000.00, 1867, 37279811, 79.4, 598862.00,  625626.00 , 'Canada', 'Constitutional monarchy', 'Elizabeth II', 'Toranto')",
  "INSERT INTO country VALUES ('Italy', 'Europe', 'Southern Europe', 301316.00, 1861, 57680000, 79.0, 1161755.00, 1145372.00, 'Italia', 'Republic', 'Carlo Azeglio Ciampi', 'Roma')",
  "INSERT INTO country VALUES ('Argentina', 'South America', 'South America', 2780400.00, 1816, 37032000, 75.1, 340238.00, 323310.00, 'Argentina', 'Federal Republic', 'Fernando de la Ria','Buenos Aires')",
  "INSERT INTO country VALUES ('Nigeria', 'Africa', 'Western Africa',  923768.00, 1960,  111506000, 51.6,  65707.00 ,  58623.00 , 'Nigeria', 'Federal Republic', ' Olusegun Obasanjo','Abuja')",
  "INSERT INTO country VALUES ('Georgia', 'Asia', 'Middle East',   69700.00, 1991, 4968000 , 64.5,  6064.00 ,  5924.00 , 'Skartvelo', 'Republic', 'Eduard Âlevardnadze','Tiflis')",
  "INSERT INTO country VALUES ('Hong Kong', 'Asia', 'Eastern Asia',  1075.00, null , 6782000 , 79.5,  166448.00 , 173610.00 , 'Xianggang/Hong', 'Special Administrative', 'Jiang Zemin','Hong Kong')",
  "INSERT INTO country VALUES ('Peru', 'South America', 'South America', 1285216.00, 1821 ,  25662000 , 70.0, 64140.00 , 65186.00 , 'Piruw', 'Republic', 'Valentin Paniagua Corazao','Lima')",
  "INSERT INTO city VALUES (1,'Kabul','AFG','Kabol',1780000)",
  "INSERT INTO city VALUES (2,'Qandahar','AFG','Qandahar',237500)",
  "INSERT INTO city VALUES (3,'Mazar-e-Sharif','AFG','Balkh',127800)",
  "INSERT INTO city VALUES (4,'Amsterdam','NLD','Noord-Holland',731200)",
  "INSERT INTO city VALUES (5,'Sharja','ARE','Sharja',320095)",
  "INSERT INTO city VALUES (6,'San Fernando','ARG','Buenos Aires',153036)",
  "INSERT INTO city VALUES (7,'San Luis','ARG','San Luis',110136)",
  "INSERT INTO city VALUES (8,'Comilla','BGD','Chittagong',135313)",
  "INSERT INTO city VALUES (9,'Cambridge','GBR','England',121000)",
  "INSERT INTO city VALUES (10,'Victoria de las Tunas','CUB','Las Tunas',132350)",
  "INSERT INTO city VALUES (11,'Manzanillo','CUB','Granma',109350)",
  "INSERT INTO city VALUES (12,'Rotterdam', 'NLD', 'Zuid-Holland',  593321)",
];

var select_queries = [
  'SELECT Name, Population FROM country WHERE Population > 8000000',
  "SELECT Name, Population FROM country WHERE Name LIKE '%land%'",
  'SELECT Name, Population FROM city WHERE  Population BETWEEN 500000 AND 1000000',
  "SELECT Name,Continent FROM country WHERE Continent='Europe'",
  'SELECT Name,SurfaceArea FROM country ORDER BY SurfaceArea DESC',
  "SELECT Name,CountryCode FROM city WHERE CountryCode='NLD'",
  "SELECT Name,Population FROM city WHERE Name='Rotterdam'",
  'SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10',
  'SELECT Name, Population FROM city ORDER BY Population DESC LIMIT 10',
  'SELECT SUM(Population) FROM country',
];

for (let i in create_queries) {
  con.query(create_queries[i], function(err, results, fields) {
    if (err) throw err;
  });
}

for (let i in insert_queries) {
  con.query(insert_queries[i], function(err, results, fields) {
    if (err) throw err;
  });
}

for (let i in select_queries) {
  con.query(select_queries[i], function(err, results, fields) {
    if (err) throw err;
    console.log('Going to run ', select_queries[i]);
    console.log('The reply:\n ', results);
  });
}
con.end();
