'use-strict';

const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySql Connected...');
});
db.query('CREATE DATABASE IF NOT EXISTS world;', error => {
  if (error) throw error;
  console.log('database created successfully');
});
db.query('USE WORLD', function(error) {
  if (error) throw error;
  console.log('database world is used ');
});

// create country table
const createCountriesTable = `
CREATE TABLE IF NOT EXISTS countries (
  Code TEXT,
  Name LONGTEXT,
  Continent TEXT ,
  Surface_Area TEXT,
  Index_Year INT,
  Population INT,
  Life_Expectancy INT,
  GNP INT, 
  GNP_Old INT, 
  Local_Name TEXT, 
  Government_Form TEXT , 
  Head_Of_State TEXT , 
  Capital TEXT , 
  Code2 TEXT , 
  PRIMARYـKEY INT 
);`;
db.query(createCountriesTable, function(error) {
  if (error) throw error.message;
  console.log('countries table is created successfully!');
});

// create cities table
const createCitiesTable = `
CREATE TABLE IF NOT EXISTS cities (
  id INT,
  name TEXT,
  Country_Code TEXT,
  District TEXT,
  Population INT

  );`;
db.query(createCitiesTable, function(error) {
  if (error) throw error.message;
  console.log('cities table is created successfully!');
});

// insert data in to countries table
const insertIntoCountriesTable =
  'INSERT INTO countries (Code,Name,Continent,Surface_Area,Indep_Year,Population,Life_Expectancy,GNP,GNP_Old,Local_Name,Government_Form,Head_Of_State,Capital,Code2,PRIMARYـKEY) VALUES ?';
let countries = [
  [
    189,
    'Aruba',
    'North America',
    5768970,
    193.0,
    476487979,
    103000,
    78.4,
    828.0,
    793.0,
    'Aruba',
    'Metropolitan Territory of The Netherlands',
    'Beatrix',
    'awg',
    129,
  ],
  [
    675,
    'Albania',
    'Europe',
    7986669,
    28748.0,
    19127987,
    3401200,
    71.6,
    3205.0,
    2500.0,
    'Siberia',
    'Republic',
    'Rexhep Mejdani',
    'AL',
    90,
  ],
  [
    56,
    'Andorra',
    'Europe',
    678687,
    468.0,
    1278,
    78000,
    83.5,
    1630.0,
    7698876,
    'Andorra',
    'Parliamentary Coprincipality',
    'kaf',
    'AD',
    89,
  ],
  [
    0432,
    'Falkland Islands',
    'Asia',
    12173.0,
    935808,
    2000,
    958093,
    80843,
    0700,
    93502375,
    'Falkland Islands',
    'Dependent Territory of the UK',
    'Elisabeth II',
    'FK',
    504,
  ],
  [
    9830,
    'Hungary',
    'Europe',
    093745,
    93030.0,
    19189088,
    10043200,
    71.4,
    48267.0,
    45914.0,
    'Magyarország',
    'Republic',
    'Ferenc Mádl',
    'HU',
    09,
  ],
  [
    7324,
    'Indonesia',
    'Asia',
    8406386,
    1904569.0,
    1945,
    212107000,
    68.0,
    84982.0,
    215002.0,
    'Indonesia',
    'Republic',
    'Abdurrahman Wahid',
    'ID',
    9583,
  ],
];

db.query(insertIntoCountriesTable, [countries], function(error) {
  if (error) throw error;
  console.log('data inserted into country table');
});

// insert data into cities table.
const insertIntoCities = 'INSERT INTO cities (id,name,Country_Code,District,Population) VALUES?';
let values = [
  [1, 'Kabul', 134, 'yemen', 9780000],
  [2, 'Kandahar', 7890708, 'Afghanistan', 76896],
  [3, 'Herat', 79987, 'yemen', 886800],
  [4, 'Clearwater', 797, 'Florida', 99936],
  [5, 'Midland', 9879, 'Texas', 98293],
  [6, 'Davenport', 87970, 'Iowa', 98256],
  [7, 'Amsterdam', 820000, 'Netherlands', 64646],
  [8, 'The Hague', 24234, 'Netherlands', 353525],
  [9, 'Rotterdam', 325325, 'Netherlands', 45335],
  [10, 'Utrecht', 35235, 'Netherlands', 435352],
  [90, 'Amsterdam', 80000, 'Netherlands', 820000],
  [69, 'The Hague', 00, 'Netherlands', 510000],
];

db.query(insertIntoCities, [values], function(error) {
  if (error) throw error;
  console.log('data inserted into city table');
});

// countries with population greater than 8000000.
db.query('SELECT Name, Population FROM countries WHERE Population > 8000000 ', function(
  error,
  resultQuery1,
) {
  if (error) throw error;
  console.log(JSON.parse(JSON.stringify(resultQuery1)));
});

// countries that has Land in their names.
db.query('SELECT Name FROM countries WHERE Name like "%land%" ', function(error, resultQuery2) {
  if (error) throw error;

  console.log(JSON.parse(JSON.stringify(resultQuery2)));
});
//cities where population between 500000 and 1000000.
db.query(
  'SELECT name, Population FROM cities WHERE Population BETWEEN 500000 AND 1000000',
  function(error, resultQuery3) {
    if (error) throw error;
    console.log(JSON.parse(JSON.stringify(resultQuery3)));
  },
);

//countries in continent Europe.
db.query('SELECT Name FROM countries WHERE Continent="Europe"', function(error, resultQuery4) {
  if (error) throw error;
  console.log(JSON.parse(JSON.stringify(resultQuery4)));
});

//List all the countries in the descending order based on their surface areas.
db.query('SELECT Name,   Surface_Area FROM countries ORDER BY  Surface_Area DESC ', function(
  error,
  resultQuery5,
) {
  if (error) throw error;
  console.log(JSON.parse(JSON.stringify(resultQuery5)));
});

//names of all the cities in the Netherlands
db.query('SELECT name  FROM cities WHERE Country_Code="Netherlands"'),
  function(error, resultQuery6) {
    if (error) throw error;
    console.log(JSON.parse(JSON.stringify(resultQuery6)));
  };
