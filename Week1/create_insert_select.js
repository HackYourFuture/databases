const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

connection.connect();

const start_DB_query = ['CREATE DATABASE world', 'USE world'];

for (let i in start_DB_query) {
  connection.query(start_DB_query[i], function(error, results, fields) {
    if (error) {
      throw error;
    }
  });
}

const cr_countries_query =
  "CREATE TABLE countries (Name varchar(60), Continent  enum('Asia' , 'Europe' , 'North America', 'Africa', 'Oceania', 'Antarctica', 'South America'), Region varchar(30), SurfaceArea int, IndepYear smallint(6), Population int, LifeExpectancy float(3,1), GNP float(10,2), GNPOld float(10,2), LocalName varchar(45), GovernmentForm varchar(45), HeadOfState varchar(60), Capital varchar(50))";

const cr_cities_query =
  'CREATE TABLE cities (ID int(11), Name varchar(35), CountryCode int(3), District varchar(20), Population int(11))';

connection.query(cr_countries_query, function(error, results, fields) {
  if (error) {
    throw error;
  }
  console.log('the reply is ', results[0]);
});
connection.query(cr_cities_query, function(error, results, fields) {
  if (error) {
    throw error;
  }
  console.log('the reply is ', results[0]);
});

// INSERT PART

const insert_queries = [
  'INSERT INTO countries VALUES ("Netherlands", "Europe", "Western Europe",  41526.00, 1581, 15864000, 78.3, 371362, 360478.00, "Nederland", "Constitutional Monarchy", "Beatrix", "Amsterdam")',
  'INSERT INTO countries VALUES ("United States", "North America", "North America",   9363520.00, 1976,  278357000, 77.1,  8510700.00,  8110900.00, "United States", "Federal Republic", "George W. Bush", "Washington D.C.")',
  'INSERT INTO countries VALUES ("Japan", "Asia", "Eastern Asia", 377829.00, -660, 126714000, 80.7, 3787042.00, 4192638.00, "Nihon/Nippon", "Constitutional Monarchy", "Akihito","Tokyo")',
  'INSERT INTO countries VALUES ("Turkey", "Asia", "Middle East",  774815.00, 1923, 80810525, 71.0,  210721.00,  189122.00, "Turkiye", "Republic", "Ahmet Necdet Sezer", "Ankara")',
  'INSERT INTO countries VALUES ("Spain", "Europe", "Europe", 520000.00, 1807, 46441049, 78.8,  553233.00,  532031.00, "España", "Constitutional monarchy", " Juan Carlos", "Madrid")',
  'INSERT INTO countries VALUES ("Canada", "North America", "North America", 9985000.00, 1867, 37279811, 79.4, 598862.00,  625626.00 , "Canada", "Constitutional monarchy", "Elizabeth II", "Toranto")',
  'INSERT INTO countries VALUES ("Italy", "Europe", "Southern Europe", 301316.00, 1861, 57680000, 79.0, 1161755.00, 1145372.00, "Italia", "Republic", "Carlo Azeglio Ciampi", "Roma")',
  'INSERT INTO countries VALUES ("Argentina", "South America", "South America", 2780400.00, 1816, 37032000, 75.1, 340238.00, 323310.00, "Argentina", "Federal Republic", "Fernando de la Ria","Buenos Aires")',
  'INSERT INTO countries VALUES ("Nigeria", "Africa", "Western Africa",  923768.00, 1960,  111506000, 51.6,  65707.00 ,  58623.00 , "Nigeria", "Federal Republic", " Olusegun Obasanjo","Abuja")',
  'INSERT INTO countries VALUES ("Georgia", "Asia", "Middle East",   69700.00, 1991, 4968000 , 64.5,  6064.00 ,  5924.00 , "Skartvelo", "Republic", "Eduard Âlevardnadze","Tiflis")',
  'INSERT INTO countries VALUES ("Hong Kong", "Asia", "Eastern Asia",  1075.00, null , 6782000 , 79.5,  166448.00 , 173610.00 , "Xianggang/Hong", "Special Administrative", "Jiang Zemin","Hong Kong")',
  'INSERT INTO countries VALUES ("Peru", "South America", "South America", 1285216.00, 1821 ,  25662000 , 70.0, 64140.00 , 65186.00 , "Piruw", "Republic", "Valentin Paniagua Corazao","Lima")',
  'INSERT INTO cities VALUES (1,"Amsterdam", 31, "Noord-Holland", 731200)',
  'INSERT INTO cities VALUES (2,"Rotterdam", 31, "Zuid-Holland",  593321)',
  'INSERT INTO cities VALUES (3,"Buenos Aires", 54, "Distrito Federal", 2982146)',
  'INSERT INTO cities VALUES (4,"Newcastle", 44, "New South Wales", 270324)',
  'INSERT INTO cities VALUES (5,"Gent", 32, "East Flanderi",  224180)',
  'INSERT INTO cities VALUES (6,"Istanbul", 90, "Marmara", 8787958)',
  'INSERT INTO cities VALUES (7,"Izmir", 90, "Ege",  2130359)',
  'INSERT INTO cities VALUES (8,"Kayseri", 90, "Central Anatolia", 475657)',
  'INSERT INTO cities VALUES (9,"Sevastopol", 380, "Kirim", 348000)',
  'INSERT INTO cities VALUES (10,"Barcelona", 34, "Anzoitegui", 322267)',
  'INSERT INTO cities VALUES (11,"Valencia", 34, " Carabobo", 794246)',
  'INSERT INTO cities VALUES (12,"Kazan", 7, "Tataristan",  1101000)',
];

for (var i in insert_queries) {
  connection.query(insert_queries[i], function(error, results, fields) {
    if (error) {
      throw error;
    }
    console.log('the reply is ', results[0]);
  });
}

// SELECT PART

const selectQueries = [
  'select name from countries where population > 8000000',
  'select name from countries where name like "%land%"',
  'select name from cities where population between 500000 and 1000000',
  'select name from countries where continent = "Europe"',
  'select name from countries order by surfacearea desc',
  'select name from cities where countrycode = 31',
  'select population from cities where name = "rotterdam"',
  'select name from countries order by surfacearea desc limit 10',
  'select name as City from cities order by population desc limit 10',
  'select sum(population) as Total_Pop_World from countries',
];
for (let i in selectQueries) {
  connection.query(selectQueries[i], function(error, results, fields) {
    if (error) {
      throw error;
    }
    console.log(results);
  });
}
connection.end();
