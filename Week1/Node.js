var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});
connection.connect();

let queries = [
  'CREATE DATABASE world',
  'USE world',
  'CREATE TABLE country (name VARCHAR(56), Continent ENUM("Asia","Europe","North America","Africa","Oceania","Antarctica","South America"), Region VARCHAR(50), SurfaceArea FLOAT(10,2),' +
    'IndepYear SMALLINT(5), Population INT(11), LifeExpectancy FLOAT(3,1), GNP FLOAT(10,1), GNPOld FLOAT(10,1), LocalName VARCHAR (74),' +
    'GovernmentForm VARCHAR(50), HeadOfState VARCHAR(30), Capital VARCHAR(30))',
  'CREATE TABLE city (ID INT, Name VARCHAR(50), CountryCode VARCHAR(10), District VARCHAR(50), Population FLOAT(8,1))',
  "INSERT INTO `country` VALUES ('Netherlands','Europe','Western Europe',41526.00,1581,15864000,78.3,371362.00,360478.00,'Nederland','Constitutional Monarchy','Beatrix','Den Haag')",
  "INSERT INTO `country` VALUES('Ireland','Europe','British Islands',70273.00,1921,3775100,76.8,75921.00,73132.00,'Ireland/ire','Republic','Mary McAleese','Dublin')",
  "INSERT INTO `country` VALUES('Iran','Asia','Southern and Central Asia',1648195.00,1906,67702000,69.7,195746.00,160151.00,'Iran','Islamic Republic','Ali Mohammad Khatami-Ardakani','Tehran')",
  "INSERT INTO `country` VALUES('Israel','Asia','Middle East',21056.00,1948,6217000,78.6,97477.00,98577.00,'Yisrael/Israil','Republic','Moshe Katzav', 'Tel Aviv')",
  "INSERT INTO `country` VALUES('Italy','Europe','Southern Europe',301316.00,1861,57680000,79.0,1161755.00,1145372.00,'Italia','Republic','Carlo Azeglio Ciampi','Roma')",
  "INSERT INTO `country` VALUES('Japan','Asia','Eastern Asia',377829.00,-660,126714000,80.7,3787042.00,4192638.00,'Nihon/Nippon','Constitutional Monarchy','Akihito','Tokyo')",
  "INSERT INTO `country` VALUES('Kazakstan','Asia','Southern and Central Asia',2724900.00,1991,16223000,63.2,24375.00,23383.00,'Qazaqstan','Republic','Nursultan Nazarbajev','Almati')",
  "INSERT INTO `country` VALUES('Turkey','Asia','Middle East',774815.00,1923,66591000,71.0,210721.00,189122.00,'Türkiye','Republic','Ahmet Necdet Sezer','Ankara')",
  "INSERT INTO `country` VALUES('Taiwan','Asia','Eastern Asia',36188.00,1945,22256000,76.4,256254.00,263451.00,'Taai-wan','Republic','Chen Shui-bian','Bangkok')",
  "INSERT INTO `country` VALUES('Albania','Europe','Southern Europe',28748.00,1912,3401200,71.6,3205.00,2500.00,'Shqiparia','Republic','Rexhep Mejdani', 'Tiran')",
  "INSERT INTO `country` VALUES('Argentina','South America','South America',2780400.00,1816,37032000,75.1,340238.00,323310.00,'Argentina','Federal Republic','Fernando de la Ria','Buenos Aires')",
  "INSERT INTO `country` VALUES('Austria','Europe','Western Europe',83859.00,1918,8091800,77.7,211860.00,206025.00,'Österreich','Federal Republic','Thomas Klestil', 'Vienne')",
  "INSERT INTO `city` VALUES(1,'Amsterdam','NLD','Noord-Holland',731200)",
  "INSERT INTO `city` VALUES(2,'Rotterdam','NLD','Zuid-Holland',593321)",
  "INSERT INTO `city` VALUES(3,'Haag','NLD','Zuid-Holland',440900)",
  "INSERT INTO `city` VALUES(4,'Apeldoorn','NLD','Gelderland',153491)",
  "INSERT INTO `city` VALUES(5,'Buenos Aires','ARG','Distrito Federal',2982146)",
  "INSERT INTO `city` VALUES(6,'Rosario','ARG','Santa Fe',907718)",
  "INSERT INTO `city` VALUES(7,'La Plata','ARG','Buenos Aires',521936)",
  "INSERT INTO `city` VALUES(8,'Charleroi','BEL','Hainaut',200827)",
  "INSERT INTO `city` VALUES(9,'Bruxelles [Brussel]','BEL','Bryssel',133859)",
  "INSERT INTO `city` VALUES(10,'Feira de Santana','BRA','Bahia',479992)",
  "INSERT INTO `city` VALUES(11,'Belford Roxo','BRA','Rio de Janeiro',425194)",
  'SELECT Name, Population FROM country WHERE population > 8000000',
  "SELECT Name FROM country WHERE Name LIKE '%land%'",
  'SELECT Name, Population FROM city WHERE Population > 500000 AND Population < 1000000',
  "SELECT Name, Continent FROM country where Continent = 'Europe'",
  'SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC',
  "SELECT Name FROM city where CountryCode = 'NLD'",
  "SELECT Population AS 'POPULATION OF ROTTERDAM' FROM city where Name = 'Rotterdam'",
  'SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10',
  'SELECT Name, Population FROM city ORDER BY Population DESC LIMIT 10',
  'SELECT SUM(Population) AS " WORLD POPULATION" FROM country',
];
for (let i in queries) {
  connection.query(queries[i], function(error, results, fields) {
    if (error) {
      throw error;
    } else if (queries[i].startsWith('SELECT')) {
      console.log('Going to run ', queries[i]);
      console.log('The result is: ');
      results.map(result => console.log(result));
      console.log('------------------------------------------------------');
    }
  });
}
connection.end();
