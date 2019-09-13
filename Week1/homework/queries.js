const QUERIES = [
  // QUERIES[0] = command 1: drops database world if exists;
  `DROP DATABASE IF EXISTS world;`,
  // QUERIES[1] = command 2: creates database world;
  `CREATE DATABASE world;`,
  // QUERIES[2] = command 3: starts to using database world. This means all commands below this is only for database world;
  `USE world;`,
  // QUERIES[3] = command 4: creates table country with its structure;
  `CREATE TABLE country 
  (Code VARCHAR(3) NOT NULL,
  Name VARCHAR(52) NOT NULL,
  Continent ENUM('Asia', 'Europe', 'North America', 'Africa', 'Oceania', 'Antarctica', 'South America') NOT NULL,
  Region VARCHAR(26),
  SurfaceArea FLOAT(10,2) DEFAULT 0.00,
  IndepYear INT,
  Population INT DEFAULT 0,
  LifeExpectancy DECIMAL(3,1),
  GNP FLOAT(10,2),
  GNPOld FLOAT(10,2),
  LocalName VARCHAR(45) NOT NULL,
  GovernmentForm VARCHAR(45),
  HeadOfState VARCHAR(60),
  Capital VARCHAR(50) NOT NULL,
  PRIMARY KEY (Code));
`,
  // QUERIES[4] = command 5: inserts data into table country;
  `INSERT INTO country 
  (Code, Name, Continent, Region, SurfaceArea, IndepYear, Population, LifeExpectancy, GNP, GNPOld, LocalName, GovernmentForm, HeadOfState, Capital)
VALUES 
  ('NLD','Netherlands','Europe','Western Europe',41526.00,1581,17084000,78.3,371362.00,360478.00,'Nederland','Constitutional Monarchy','Willem-Alexander','Amsterdam'), 
  ('CAN','Canada','North America','Central America',9970610.00,1867,37602103,79.4,371362.00,360478.00,'Canada','Constitutional Monarchy, Federation','Elisabeth II','Ottawa'),
  ('DEU','Germany','Europe','Western Europe',357022.00,1955,83019200,75.7,371362.00,360478.00,'Deutschland','Federal Republic','Frank-Walter Steinmeier','Berlin'), 
  ('JAM','Jamaica','North America','Caribbean',10990.00,1962,2890299,65.3,31366.00,30448.00,'Jamaica','Constitutional Monarchy','Elisabeth II','Kingston'), 
  ('VNM','Vietnam','Asia','Southeast Asia',331689.00,1945,94569072,69.3,371362.00,360478.00,'Viêt Nam','Socialistic Republic','Nguyen Phu Trong','Hanoi')
`,
  // QUERIES[5] = command 6: creates table city with its structure;
  `CREATE TABLE city (
  ID INT(11) NOT NULL AUTO_INCREMENT,
  Name CHAR(35) NOT NULL DEFAULT '',
  CountryCode CHAR(3) NOT NULL DEFAULT '',
  District CHAR(20) NOT NULL DEFAULT '',
  Population INT(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (ID),
  KEY CountryCode (CountryCode),
  CONSTRAINT city_ibfk_1 FOREIGN KEY (CountryCode) REFERENCES country (Code)
);
`,
  // QUERIES[6] = command 7: inserts data into table city;
  `INSERT INTO city 
  (Name, CountryCode, District, Population)
VALUES 
  ('Amsterdam','NLD','North-Holland',821752),
  ('Rotterdam','NLD','Zuid-Holland',593321),
  ('Ottawa','CAN','Ontario',934243),
  ('Berlin','DEU','Berlin',4105000),
  ('Kingston','JAM','St. Andrew',666041),
  ('Hanoi','VNM','Hanoi',7782000);
`,
];

module.exports = { QUERIES };
