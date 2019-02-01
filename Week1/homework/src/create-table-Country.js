'use-strict';

const createTable_and_Insert = require('./create-tables_and_Insert');

const Create_Country_TB = `CREATE TABLE IF NOT EXISTS country (
  ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  population DOUBLE,
  surface_area INT,
  continent VARCHAR(50),
  UNIQUE KEY unique_country (name)
  );`;

const country = [{
    name: 'Netherlands',
    population: 17000000,
    surface_area: 41526,
    continent: 'Europe'
  },
  {
    name: 'Gabon',
    population: 8300000,
    surface_area: 83858,
    continent: 'Africa'
  },
  {
    name: 'Guinea',
    population: 5400000,
    surface_area: 43094,
    continent: 'Africa'
  },
  {
    name: 'Finland',
    population: 5300000,
    surface_area: 337030,
    continent: 'Europe'
  },
  {
    name: 'France',
    population: 65130000,
    surface_area: 643548,
    continent: 'Europe'
  },
  {
    name: 'Germany',
    population: 80400000,
    surface_area: 357021,
    continent: 'Europe'
  },
  {
    name: 'Greece',
    population: 11100000,
    surface_area: 131940,
    continent: 'Europe'
  },
  {
    name: 'Ireland',
    population: 4600000,
    surface_area: 70280,
    continent: 'Europe'
  },
  {
    name: 'Italy',
    population: 58800000,
    surface_area: 301320,
    continent: 'Europe'
  },
  {
    name: 'Kenya',
    population: 41100000,
    surface_area: 224961,
    continent: 'Africa'
  },
  {
    name: 'United Kingdom',
    population: 64700000,
    surface_area: 244820,
    continent: 'Europe'
  },
  {
    name: 'Kuwait',
    population: 2600000,
    surface_area: 6880,
    continent: 'Asia'
  },
  {
    name: 'hungary',
    population: 1800000,
    surface_area: 9230,
    continent: 'Europe'
  },
  {
    name: 'China',
    population: 1336718015,
    surface_area: 3775386,
    continent: 'Asia'
  },
  {
    name: 'Eritrea',
    population: 59000000,
    surface_area: 46842,
    continent: 'Africa'
  },
  {
    name: 'United States',
    population: 313232000,
    surface_area: 3718691,
    continent: 'North America'
  },
  {
    name: 'Peru',
    population: 12100000,
    surface_area: 1204304,
    continent: 'South America'
  },
  {
    name: 'India',
    population: 1189180000,
    surface_area: 1269338,
    continent: 'Asia'
  },
  {
    name: 'Brazil',
    population: 203420000,
    surface_area: 3286470,
    continent: 'South America'
  }

];

const insert_query = 'INSERT  INTO country SET ? ';

createTable_and_Insert(Create_Country_TB, insert_query, country);