const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

function sendQuery(query) {
  // console.log(query);
  connection.query(query, function(error, results) {
    if (error) {
      throw error;
    }
    console.log('the reply is', results);
  });
}

connection.connect();

const drop_database = 'drop database if exists new_world;';

sendQuery(drop_database);

const create_database = 'create database new_world;';
const use_database = 'use new_world;';

sendQuery(create_database);
sendQuery(use_database);

const create_country =
  'create table if not exists country (Code CHAR(3), name varchar(50), Continent varchar(50), Region varchar(50), Surface_Area int, Indep_year date, Population int, Life_Expectancy float, GNP float, GNPOld float, Local_Name varchar(50), Government_form varchar(50), Head_of_state varchar(50), Capital varchar(50))';

const insert_country = [
  "INSERT INTO country VALUES ('NLD', 'Netherlands', 'Europe', 'Western Europe', 800, '1581-01-01', 17035938, 78.3, NULL, NULL, NULL, 'Constitutional Monarchy', NULL, 'Amsterdam')",
  "INSERT INTO country VALUES ('AFG', 'Afghanistan', 'Asia', 'Southern and Central Asia', 652090, '1919-01-01', 35530081, 45.9, NULL, NULL, NULL, 'Islamic Emirate', NULL, 'Kabul')",
  "INSERT INTO country VALUES ('ROM', 'Romania', 'Europe', 'Eastern Europe', 238391, '1878-01-01', 19679306, 69.9, NULL, NULL, NULL, 'Republic', NULL, 'Bucharest')",
  "INSERT INTO country VALUES ('CHE', 'Switzerland', 'Europe', 'Western Europe', 41284, '1499-01-01', 8476005, 79.6, NULL, NULL, NULL, 'Federation', NULL, 'Bern')",
  "INSERT INTO country VALUES ('SWE', 'Sweden', 'Europe', 'Nordic Countries', 449964, '836-01-01', 9910701, 79.6, NULL, NULL, NULL, 'Constitutional Monarchy', NULL, 'Stockholm')",
  "INSERT INTO country VALUES ('SYR', 'Syria', 'Asia', 'Middle East', 185180, '1941-01-01', 18269868, 68.5, NULL, NULL, NULL, 'Republic', NULL, 'Damascus')",
  "INSERT INTO country VALUES ('TZA', 'Tanzania', 'Africa', 'Eastern Africa', 883749, '1961-01-01', 57310019, 52.3, NULL, NULL, NULL, 'Republic', NULL, 'Dodoma')",
];

sendQuery(create_country);
for (let i = 0; i < insert_country.length; i++) {
  sendQuery(insert_country[i]);
}

//Create a table called 'city'.
const create_city =
  'create table if not exists city (ID int, Name varchar(50), Country_Code char(3), District varchar(50), Population int)';

const insert_city = [
  "INSERT INTO city VALUES (1, 'Amsterdam', 'NLD', NULL, 821752)",
  "INSERT INTO city VALUES (2, 'Rotterdam', 'NLD', NULL, 623652)",
  "INSERT INTO city VALUES (3, 'Kabul', 'AFG', NULL, 4600000)",
  "INSERT INTO city VALUES (4, 'Bucharest', 'ROM', NULL, 1836000)",
  "INSERT INTO city VALUES (5, 'Stockholm', 'SWE', NULL, 965232)",
  "INSERT INTO city VALUES (6, 'Damascus', 'SYR', NULL, 1711000)",
  "INSERT INTO city VALUES (7, 'Dodoma', 'TZA', NULL, 2084000)",
  "INSERT INTO city VALUES (8, 'Bern', 'CHE', NULL, 133115)",
];

sendQuery(create_city);
for (let i = 0; i < insert_city.length; i++) {
  sendQuery(insert_city[i]);
}

const create_language =
  "create table countrylanguage (CountryCode CHAR(3) , Language varchar(30), IsOfficial enum('T','F'), Percentage FLOAT(4,1), PRIMARY KEY(CountryCode, Language))";
const insert_language = [
  "INSERT INTO countrylanguage VALUES ('NLD','Dutch','T',5.3)",
  "INSERT INTO countrylanguage VALUES ('AFG','Balochi','F',0.9)",
  "INSERT INTO countrylanguage VALUES ('ROM','Dari','T',32.1)",
  "INSERT INTO countrylanguage VALUES ('CHE','Pashto','T',52.4)",
  "INSERT INTO countrylanguage VALUES ('SWE','Turkmenian','F',1.9)",
  "INSERT INTO countrylanguage VALUES ('SYR','Uzbek','F',8.8)",
  "INSERT INTO countrylanguage VALUES ('TZA','Ambo','F',2.4)",
];

sendQuery(create_language);

for (let i = 0; i < insert_language.length; i++) {
  sendQuery(insert_language[i]);
}

connection.end();
