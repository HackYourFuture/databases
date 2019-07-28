var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});
connection.connect(function(err) {
  if (err) throw err;
  console.log('table creator connected');
});
var world = 'create database if not exists myWorld';
connection.query(world, function(error, results) {
  if (error) {
    throw error;
  }
  console.log('the reply is ', results[0]);
});
connection.query('use myWorld');
var create_table = [
  'create table country (country_id int,country_name varchar(50),Continent varchar(50),Region varchar(50),SurfaceArea int,Population int,LifeExpectancy int,GNP float,GNPOld float,LocalName varchar(50),GovernmentForm varchar(50),HeadOfState varchar(50),Capital varchar(50))',
  'create table city (id int,city_name varchar(50),CountryCode varchar(50),District varchar(50),Population int)',
];
for (var i in create_table) {
  connection.query(create_table[i], function(error, results, fields) {
    if (error) {
      throw error;
    }
    console.log('the reply is ', results[0]);
  });
}
var country = [
  "insert into country values (1,'Afghanistan','Asia','Southern and Central Asia',652090.00,22720000,45.9,5976.00,NULL,'Afganistan/Afqanestan','Islamic Emirate','Mohammad Omar','kabul')",
  "insert into country values (2,'Netherlands Antilles','North America','Caribbean',800.00,217000,74.7,1941.00,NULL,'Nederlandse Antillen','Nonmetropolitan Territory of The Netherlands','Beatrix','a city')",
  "insert into country values (3,'Argentina','South America','South America',2780400.00,37032000,75.1,340238.00,323310.00,'Argentina','Federal Republic','Fernando de la R�a','piones')",
  "insert into country values (4,'Australia','Oceania','Australia and New Zealand',7741220.00,18886000,79.8,351182.00,55,'Australia','Constitutional Monarchy, Federation','Elisabeth II','a capital')",
  "insert into country values (5,'Austria','Europe','Western Europe',83859.00,8091800,77.7,211860.00,206025.00,'�sterreich','Federal Republic','Thomas Klestil','veena')",
  "insert into country values (6,'Switzerland','Europe','Western Europe',41284.00,7160400,79.6,264478.00,256092.00,'Schweiz/Suisse/Svizzera/Svizra','Federation','Adolf Ogi','sweess')",
  "insert into country values (7,'Mexico','North America','Central America',1958201.00,98881000,71.5,414972.00,401461.00,'M�xico','Federal Republic','Vicente Fox Quesada','new mexico')",
  "insert into country values (8,'Philippines','Asia','Southeast Asia',300000.00,75967000,67.5,65107.00,82239.00,'Pilipinas','Republic','Gloria Macapagal-Arroyo','philipinos')",
  "insert into country values (9,'Syria','Asia','Middle East',185180.00,16125000,68.5,65984.00,64926.00,'Suriya','Republic','fuckin Bashar al-Assad','damascus')",
];
for (var i in country) {
  console.log('Going to run ', country[i]);
  connection.query(country[i], function(error, results) {
    if (error) {
      throw error;
    }
    console.log('the reply is ', results[0]);
  });
}
var city = [
  "insert into city values(1,'Kabul','AFG','Kabol',1780000)",
  "insert into city values(2,'Ajman','ARE','Ajman',114395)",
  "insert into city values(3,'Liverpool','GBR','England',461000)",
  "insert into city values(4,'Milano','ITA','Lombardia',1300977)",
  "insert into city values(5,'Tokyo','JPN','Tokyo-to',7980230)",
  "insert into city values (6,'Long Beach','USA','California',461522)",
  "insert into city values(7,'Amsterdam','NLD','Noord-Holland',731200)",
  "insert into city values(8,'Rotterdam','NLD','Zuid-Holland',593321)",
];
for (var i in city) {
  console.log('Going to run ', city[i]);
  connection.query(city[i], function(error, results) {
    if (error) {
      throw error;
    }
    console.log('the reply is ', results[0]);
  });
}
connection.end();
