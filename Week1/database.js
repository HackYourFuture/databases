'use strict'

let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'world'
});

let database = 'create database IF NOT EXISTS world';
let useDatabase = 'use world';

let tableCountry = ` CREATE TABLE IF NOT EXISTS country(
  Code CHAR(3) NOT NULL DEFAULT ,
  Name CHAR(52) NOT NULL DEFAULT,
  Continent enum('Asia','Europe','North America','Africa','Oceania','Antarctica','South America'),
  Region CHAR(26) NOT NULL DEFAULT,
  SurfaceArea FLOAT(10,2) NOT NULL DEFAULT,
  IndepYear SMALLINT(6) DEFAULT NULL,
  Population INT(11) NOT NULL DEFAULT,
  LifeExpectancy FLOAT(3,1) DEFAULT NULL,
  GNP FLOAT(10,2) DEFAULT NULL,
  GNPOld FLOAT(10,2) DEFAULT NULL,
  LocalName CHAR(45) NOT NULL DEFAULT,
  GovernmentForm CHAR(45) NOT NULL DEFAULT,
  HeadOfState CHAR(60) DEFAULT NULL,
  Capital INT(11) DEFAULT NULL,
  Code2 CHAR(2) NOT NULL DEFAULT,
  PRIMARY KEY (Code)
)`;

let tableCity = ` CREATE TABLE IF NOT EXISTS city(
      ID INT not NULL AUTO_INCREMENT,
      name CHAR(20),
      CountryCode CHAR(3),
      District CHAR(20),
      population INT,
      primary key (ID)
      )`;

connection.connect();

let createQuery = [database, useDatabase, tableCountry, tableCity ];
  for(let i =0; i < createQuery.length; i++) {
    connection.query(createQuery[i], function (error, results) {
      if (error) {
          throw error;
        }
        console.log(results);
  });
}

let insertCountryValues = [
  "INSERT INTO country VALUES ('ABW','Aruba','North America','Caribbean',193.00,NULL,103000,78.4,828.00,793.00,'Aruba','Nonmetropolitan Territory of The Netherlands','Beatrix',129,'AW')",
  "INSERT INTO country VALUES ('AFG','Afghanistan','Asia','Southern and Central Asia',652090.00,1919,22720000,45.9,5976.00,NULL,'Afganistan/Afqanestan','Islamic Emirate','Mohammad Omar',1,'AF')",
  "INSERT INTO country VALUES ('AGO','Angola','Africa','Central Africa',1246700.00,1975,12878000,38.3,6648.00,7984.00,'Angola','Republic','Jos� Eduardo dos Santos',56,'AO')",
  "INSERT INTO country VALUES ('AIA','Anguilla','North America','Caribbean',96.00,NULL,8000,76.1,63.20,NULL,'Anguilla','Dependent Territory of the UK','Elisabeth II',62,'AI')",
  "INSERT INTO country VALUES ('ALB','Albania','Europe','Southern Europe',28748.00,1912,3401200,71.6,3205.00,2500.00,'Shqip�ria','Republic','Rexhep Mejdani',34,'AL')",
  "INSERT INTO country VALUES ('AND','Andorra','Europe','Southern Europe',468.00,1278,78000,83.5,1630.00,NULL,'Andorra','Parliamentary Coprincipality','',55,'AD')",
  "INSERT INTO country VALUES ('ANT','Netherlands Antilles','North America','Caribbean',800.00,NULL,217000,74.7,1941.00,NULL,'Nederlandse Antillen','Nonmetropolitan Territory of The Netherlands','Beatrix',33,'AN')",
  "INSERT INTO country VALUES ('ARE','United Arab Emirates','Asia','Middle East',83600.00,1971,2441000,74.1,37966.00,36846.00,'Al-Imarat al-�Arabiya al-Muttahida','Emirate Federation','Zayid bin Sultan al-Nahayan',65,'AE')",
  "INSERT INTO country VALUES ('ARG','Argentina','South America','South America',2780400.00,1816,37032000,75.1,340238.00,323310.00,'Argentina','Federal Republic','Fernando de la R�a',69,'AR')",
  "INSERT INTO country VALUES ('ARM','Armenia','Asia','Middle East',29800.00,1991,3520000,66.4,1813.00,1627.00,'Hajastan','Republic','Robert Kot�arjan',126,'AM')",
  "INSERT INTO country VALUES ('ASM','American Samoa','Oceania','Polynesia',199.00,NULL,68000,75.1,334.00,NULL,'Amerika Samoa','US Territory','George W. Bush',54,'AS')",
  "INSERT INTO country VALUES ('ATA','Antarctica','Antarctica','Antarctica',13120000.00,NULL,0,NULL,0.00,NULL,'�','Co-administrated','',NULL,'AQ')",
  "INSERT INTO country VALUES ('ATF','French Southern territories','Antarctica','Antarctica',7780.00,NULL,0,NULL,0.00,NULL,'Terres australes fran�aises','Nonmetropolitan Territory of France','Jacques Chirac',NULL,'TF')",
  "INSERT INTO country VALUES ('ATG','Antigua and Barbuda','North America','Caribbean',442.00,1981,68000,70.5,612.00,584.00,'Antigua and Barbuda','Constitutional Monarchy','Elisabeth II',63,'AG')",
  "INSERT INTO country VALUES ('AUS','Australia','Oceania','Australia and New Zealand',7741220.00,1901,18886000,79.8,351182.00,392911.00,'Australia','Constitutional Monarchy, Federation','Elisabeth II',135,'AU')",
  "INSERT INTO country VALUES ('AUT','Austria','Europe','Western Europe',83859.00,1918,8091800,77.7,211860.00,206025.00,'�sterreich','Federal Republic','Thomas Klestil',1523,'AT')",
  "INSERT INTO country VALUES ('AZE','Azerbaijan','Asia','Middle East',86600.00,1991,7734000,62.9,4127.00,4100.00,'Az�rbaycan','Federal Republic','Heyd�r �liyev',144,'AZ')",
  "INSERT INTO country VALUES ('BDI','Burundi','Africa','Eastern Africa',27834.00,1962,6695000,46.2,903.00,982.00,'Burundi/Uburundi','Republic','Pierre Buyoya',552,'BI')",
  "INSERT INTO country VALUES ('BEL','Belgium','Europe','Western Europe',30518.00,1830,10239000,77.8,249704.00,243948.00,'Belgi�/Belgique','Constitutional Monarchy, Federation','Albert II',179,'BE')",
  "INSERT INTO country VALUES ('BEN','Benin','Africa','Western Africa',112622.00,1960,6097000,50.2,2357.00,2141.00,'B�nin','Republic','Mathieu K�r�kou',187,'BJ')",
  "INSERT INTO country VALUES ('BFA','Burkina Faso','Africa','Western Africa',274000.00,1960,11937000,46.7,2425.00,2201.00,'Burkina Faso','Republic','Blaise Compaor�',549,'BF')",
  "INSERT INTO country VALUES ('BGD','Bangladesh','Asia','Southern and Central Asia',143998.00,1971,129155000,60.2,32852.00,31966.00,'Bangladesh','Republic','Shahabuddin Ahmad',150,'BD')",
  "INSERT INTO country VALUES ('BGR','Bulgaria','Europe','Eastern Europe',110994.00,1908,8190900,70.9,12178.00,10169.00,'Balgarija','Republic','Petar Stojanov',539,'BG')",
  "INSERT INTO country VALUES ('BHR','Bahrain','Asia','Middle East',694.00,1971,617000,73.0,6366.00,6097.00,'Al-Bahrayn','Monarchy (Emirate)','Hamad ibn Isa al-Khalifa',149,'BH')",
  "INSERT INTO country VALUES ('BHS','Bahamas','North America','Caribbean',13878.00,1973,307000,71.1,3527.00,3347.00,'The Bahamas','Constitutional Monarchy','Elisabeth II',148,'BS')",
  "INSERT INTO country VALUES ('BIH','Bosnia and Herzegovina','Europe','Southern Europe',51197.00,1992,3972000,71.5,2841.00,NULL,'Bosna i Hercegovina','Federal Republic','Ante Jelavic',201,'BA')",
  "INSERT INTO country VALUES ('BLR','Belarus','Europe','Eastern Europe',207600.00,1991,10236000,68.0,13714.00,NULL,'Belarus','Republic','Aljaksandr Luka�enka',3520,'BY')",
  "INSERT INTO country VALUES ('BLZ','Belize','North America','Central America',22696.00,1981,241000,70.9,630.00,616.00,'Belize','Constitutional Monarchy','Elisabeth II',185,'BZ')",
  "INSERT INTO country VALUES ('BMU','Bermuda','North America','North America',53.00,NULL,65000,76.9,2328.00,2190.00,'Bermuda','Dependent Territory of the UK','Elisabeth II',191,'BM')",
  "INSERT INTO country VALUES ('BOL','Bolivia','South America','South America',1098581.00,1825,8329000,63.7,8571.00,7967.00,'Bolivia','Republic','Hugo B�nzer Su�rez',194,'BO')",
  "INSERT INTO country VALUES ('BRA','Brazil','South America','South America',8547403.00,1822,170115000,62.9,776739.00,804108.00,'Brasil','Federal Republic','Fernando Henrique Cardoso',211,'BR')",
  "INSERT INTO country VALUES ('BRB','Barbados','North America','Caribbean',430.00,1966,270000,73.0,2223.00,2186.00,'Barbados','Constitutional Monarchy','Elisabeth II',174,'BB')",
  "INSERT INTO country VALUES ('BRN','Brunei','Asia','Southeast Asia',5765.00,1984,328000,73.6,11705.00,12460.00,'Brunei Darussalam','Monarchy (Sultanate)','Haji Hassan al-Bolkiah',538,'BN')",
  "INSERT INTO country VALUES ('BTN','Bhutan','Asia','Southern and Central Asia',47000.00,1910,2124000,52.4,372.00,383.00,'Druk-Yul','Monarchy','Jigme Singye Wangchuk',192,'BT')",
  "INSERT INTO country VALUES ('BVT','Bouvet Island','Antarctica','Antarctica',59.00,NULL,0,NULL,0.00,NULL,'Bouvet�ya','Dependent Territory of Norway','Harald V',NULL,'BV')",
  "INSERT INTO country VALUES ('BWA','Botswana','Africa','Southern Africa',581730.00,1966,1622000,39.3,4834.00,4935.00,'Botswana','Republic','Festus G. Mogae',204,'BW')",
  "INSERT INTO country VALUES ('CAF','Central African Republic','Africa','Central Africa',622984.00,1960,3615000,44.0,1054.00,993.00,'Centrafrique/B�-Afr�ka','Republic','Ange-F�lix Patass�',1889,'CF')",
  "INSERT INTO country VALUES ('CAN','Canada','North America','North America',9970610.00,1867,31147000,79.4,598862.00,625626.00,'Canada','Constitutional Monarchy, Federation','Elisabeth II',1822,'CA')",
  "INSERT INTO country VALUES ('CCK','Cocos (Keeling) Islands','Oceania','Australia and New Zealand',14.00,NULL,600,NULL,0.00,NULL,'Cocos (Keeling) Islands','Territory of Australia','Elisabeth II',2317,'CC')",
  "INSERT INTO country VALUES ('CHE','Switzerland','Europe','Western Europe',41284.00,1499,7160400,79.6,264478.00,256092.00,'Schweiz/Suisse/Svizzera/Svizra','Federation','Adolf Ogi',3248,'CH')",
  "INSERT INTO country VALUES ('CHL','Chile','South America','South America',756626.00,1810,15211000,75.7,72949.00,75780.00,'Chile','Republic','Ricardo Lagos Escobar',554,'CL')",
  "INSERT INTO country VALUES ('CHN','China','Asia','Eastern Asia',9572900.00,-1523,1277558000,71.4,982268.00,917719.00,'Zhongquo','People\'sRepublic','Jiang Zemin',1891,'CN')"
]

for(let i in insertCountryValues){
  console.log("Going to run ", insertCountryValues[i])
  connection.query(insertCountryValues[i], function (error, results, fields) {
      if (error) {
          throw error;
      }
      console.log("the reply is ", results[0]);
  });
}

let insertCityValues = [
  "INSERT INTO city VALUES (1,'Kabul','AFG','Kabol',1780000)",
  "INSERT INTO city VALUES (2,'Qandahar','AFG','Qandahar',237500)",
  "INSERT INTO city VALUES (3,'Herat','AFG','Herat',186800)",
  "INSERT INTO city VALUES (4,'Mazar-e-Sharif','AFG','Balkh',127800)",
  "INSERT INTO city VALUES (5,'Amsterdam','NLD','Noord-Holland',731200)",
  "INSERT INTO city VALUES (6,'Rotterdam','NLD','Zuid-Holland',593321)",
  "INSERT INTO city VALUES (7,'Haag','NLD','Zuid-Holland',440900)",
  "INSERT INTO city VALUES (8,'Utrecht','NLD','Utrecht',234323)",
  "INSERT INTO city VALUES (9,'Eindhoven','NLD','Noord-Brabant',201843)",
  "INSERT INTO city VALUES (10,'Tilburg','NLD','Noord-Brabant',193238)",
  "INSERT INTO city VALUES (11,'Groningen','NLD','Groningen',172701)",
  "INSERT INTO city VALUES (12,'Breda','NLD','Noord-Brabant',160398)",
  "INSERT INTO city VALUES (13,'Apeldoorn','NLD','Gelderland',153491)",
  "INSERT INTO city VALUES (14,'Nijmegen','NLD','Gelderland',152463)",
  "INSERT INTO city VALUES (15,'Enschede','NLD','Overijssel',149544)",
  "INSERT INTO city VALUES (16,'Haarlem','NLD','Noord-Holland',148772)",
  "INSERT INTO city VALUES (17,'Almere','NLD','Flevoland',142465)",
  "INSERT INTO city VALUES (18,'Arnhem','NLD','Gelderland',138020)",
  "INSERT INTO city VALUES (19,'Zaanstad','NLD','Noord-Holland',135621)",
  "INSERT INTO city VALUES (20,'�s-Hertogenbosch','NLD','Noord-Brabant',129170)",
  "INSERT INTO city VALUES (21,'Amersfoort','NLD','Utrecht',126270)",
  "INSERT INTO city VALUES (22,'Maastricht','NLD','Limburg',122087)",
  "INSERT INTO city VALUES (23,'Dordrecht','NLD','Zuid-Holland',119811)",
  "INSERT INTO city VALUES (24,'Leiden','NLD','Zuid-Holland',117196)",
  "INSERT INTO city VALUES (25,'Haarlemmermeer','NLD','Noord-Holland',110722)",
  "INSERT INTO city VALUES (26,'Zoetermeer','NLD','Zuid-Holland',110214)",
  "INSERT INTO city VALUES (27,'Emmen','NLD','Drenthe',105853)",
  "INSERT INTO city VALUES (28,'Zwolle','NLD','Overijssel',105819)",
  "INSERT INTO city VALUES (29,'Ede','NLD','Gelderland',101574)",
  "INSERT INTO city VALUES (30,'Delft','NLD','Zuid-Holland',95268)",
  "INSERT INTO city VALUES (31,'Heerlen','NLD','Limburg',95052)",
  "INSERT INTO city VALUES (32,'Alkmaar','NLD','Noord-Holland',92713)",
  "INSERT INTO city VALUES (33,'Willemstad','ANT','Cura�ao',2345)"
];

for(let i in insertCityValues){
  console.log("Going to run ", insertCityValues[i])
  connection.query(insertCityValues[i], function (error, results, fields) {
      if (error) {
          throw error;
      }
      console.log("the reply is ", results[0]);
  });
}


let selectQueries = [
      `select * from country where population > 8000000;`,
      `select * from country where name LIKE '%land%';`,
      `select * from city where population > 500000 and population < 1000000;`,
      `select * from country where continent='Europe';`,
      `select * from country order by surfaceArea DESC;`,
      `select * from city where countrycode = 'NLD';`,
      `select population from city where name = 'Rotterdam';`,
      `select name from country order by surfaceArea desc limit 10;`,
      `select name from city order by population DESC limit 10;`,
      `select sum(population) from country;`,
];

let answers = [
  `The names of the coutries where population is greater than 8 million are:`,
  `The names of the countries with word 'land' in it:`,
  `The names of the cities where the population is between 500,000 and 1000000: `,
  `The names of the countries on Europe's continent are: `,
  `A list all countries in the descending order based on their surface areas: `,
  `The names of all the cities in the Netherlands are: `,
  `The population of Rotterdam is: `,
  `The top 10 countries based on surface area are: `,
  `The top 10 cities with the highest population are: `,
  `The population of the world is: `
]

 for(let i = 0; i < selectQueries.length; i++){
   connection.query(selectQueries[i], function (error, results) {
        if (error) {
            throw error;
         }
     console.log(answers[i] + '\n' , results);
     });
}

connection.end();
