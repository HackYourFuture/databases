const createTable_and_Insert = require('./create-tables_and_Insert')

const Create_city_TB = `CREATE TABLE IF NOT EXISTS city (
  ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  population DECIMAL,
  country VARCHAR(50),
  UNIQUE KEY unique_city (name)
  );`;


const city = [{
    name: 'Amsterdam',
    population: 805166,
    country: 'Netherlands'
  },
  {
    name: 'Rotterdam',
    population: 614543,
    country: 'Netherlands'
  },
  {
    name: 'Den Haag',
    population: 507611,
    country: 'Netherlands'
  },
  {
    name: 'Shangahai',
    population: 24153000,
    country: 'China'
  },
  {
    name: 'Delhi',
    population: 11548000,
    country: 'India'
  },
  {
    name: 'London',
    population: 867400,
    country: 'United kingdom'
  },
  {
    name: 'Khartum',
    population: 5185000,
    country: 'Sudan'
  },
  {
    name: 'Chicago',
    population: 2720000,
    country: 'USA'
  },
  {
    name: 'Asmara',
    population: 900000,
    country: 'Eritrea'
  },
  {
    name: 'Doha',
    population: 567000,
    country: 'Qatar'
  },
  {
    name: 'Victoria',
    population: 27000,
    country: 'Seychelles'
  }, {
    name: 'Mogadisho',
    population: 158.343,
    country: 'Somalia'
  },
  {
    name: 'Alkmaar',
    population: 94.958,
    country: 'Netherlands'
  }
];

const insert_query_cities = 'INSERT  INTO city SET ? '
createTable_and_Insert(Create_city_TB, insert_query_cities, city);