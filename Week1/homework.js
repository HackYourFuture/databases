let mysql = require('mysql');

// establish db
let db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'world',
});

// connect database
db.connect(err => {
  if (err) throw err;
  console.log('Mysql connected....');
});

// drop database
let drop_db = `DROP DATABASE IF EXISTS world`;
db.query(drop_db, (error, result) => {
  if (error) throw error;
  // console.log(result);
});

// create database
let create_db = `CREATE DATABASE IF NOT EXISTS world`;
db.query(create_db, (error, result) => {
  if (error) throw error;
  // console.log(result);
  console.log('Database WORLD has been created');
});

let use_db = `USE world`;
db.query(use_db, (error, result) => {
  if (error) throw error;
  // console.log(result);
  console.log('use WORLD database');
});

// create country table
const create_country_table =
  'CREATE TABLE IF NOT EXISTS country(`ID` INT(11)  AUTO_INCREMENT , `Name` VARCHAR(35) , `Continent` VARCHAR(35) ,`Population` INT(11),  `SurfaceArea` FLOAT(10,2) , PRIMARY KEY (`ID`))';
db.query(create_country_table, (error, result) => {
  if (error) throw error;
  // console.log(result);
  console.log('Country table has been created');
});

// insert countries
const insert_country_queries = [
  `insert into country ( Name, Continent, Population, SurfaceArea ) values ('Belgium','Europe',10239000,30518.00)`,
  `insert into country ( Name, Continent, Population, SurfaceArea ) values ('Bahrain','Asia',617000,694.00)`,
  `insert into country ( Name, Continent, Population, SurfaceArea ) values ('Cook Islands','Oceania', 20000, 236.00)`,
  `insert into country ( Name, Continent, Population, SurfaceArea ) values ('China','Asia',1277558000, 1075.00)`,
  `insert into country ( Name, Continent, Population, SurfaceArea ) values ('Egypt','Africa',68470000,1001449.00)`,
  `insert into country ( Name, Continent, Population, SurfaceArea ) values ('Georgia','Middle East',4968000,69700.00)`,
  `insert into country ( Name, Continent, Population, SurfaceArea ) values ('Jamaica','North America',2583000,10990.00)`,
  `insert into country ( Name, Continent, Population, SurfaceArea ) values ('Switzerland','Europe', 7160400,41284.00)`,
  `insert into country ( Name, Continent, Population, SurfaceArea ) values ('Morocco','Africa', 28351000, 446550.00)`,
  `insert into country ( Name, Continent, Population, SurfaceArea ) values ('Netherlands','Europe',15864000,41526.00)`,
  `insert into country ( Name, Continent, Population, SurfaceArea ) values ('Paraguay','South America',5496000,406752.00)`,
  `insert into country ( Name, Continent, Population, SurfaceArea ) values ('Turkey','Middle East',66591000 ,774815.00)`,
];

for (let i in insert_country_queries) {
  // console.log('Going to run ', insert_country_queries[i]);
  db.query(insert_country_queries[i], error => {
    if (error) {
      throw error;
    }
    console.log(`record ${i} has been succeeded`);
  });
}

// create city table
const create_city_table =
  'CREATE TABLE IF NOT EXISTS city( `ID` INT(11)  AUTO_INCREMENT,`Name` VARCHAR(35) ,`CountryCode` VARCHAR(3) ,`District` VARCHAR(20) ,`Population` INT(11) , PRIMARY KEY (`ID`))';
db.query(create_city_table, (error, result) => {
  if (error) throw error;
  // console.log(result);
  console.log('City table has been created');
});

// insert cities
const insert_cities_queries = [
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Mazar-e-Sharif','AFG','Balkh',127800)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Amsterdam','NLD','Noord-Holland',731200)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Namibe','AGO','Namibe',118200)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('South Hill','AIA','–',961)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('The Valley','AIA','–',595)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Saint John´s','ATG','St John',24000)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Dubai','ARE','Dubai',669181)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Rotterdam','NLD','Zuid-Holland',593321)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Apeldoorn','NLD','Gelderland',153491)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Abu Dhabi','ARE','Abu Dhabi',398695)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Sharja','ARE','Sharja',320095)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Nijmegen','NLD','Gelderland',152463)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Enschede','NLD','Overijssel',149544)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Haarlem','NLD','Noord-Holland',148772)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Fagatogo','ASM','Tutuila',2323)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Andorra la Vella','AND','Andorra la Vella',21189)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Luanda','AGO','Luanda',2022000)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Haag','NLD','Zuid-Holland',440900)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Utrecht','NLD','Utrecht',234323)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Almere','NLD','Flevoland',142465)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Arnhem','NLD','Gelderland',138020)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Breda','NLD','Noord-Brabant',160398)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Huambo','AGO','Huambo',163100)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Lobito','AGO','Benguela',130000)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Benguela','AGO','Benguela',128300)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Zaanstad','NLD','Noord-Holland',135621)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Ghardaïa','DZA','Ghardaïa',89415)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Tafuna','ASM','Tutuila',5200)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Eindhoven','NLD','Noord-Brabant',201843)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Tilburg','NLD','Noord-Brabant',193238)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Groningen','NLD','Groningen',172701)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('al-Ayn','ARE','Abu Dhabi',225970)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Ajman','ARE','Ajman',114395)`,
  `INSERT INTO city ( Name, CountryCode, District, Population ) VALUES ('Buenos Aires','ARG','Distrito Federal',2982146)`,
];

for (let i in insert_cities_queries) {
  // console.log('Going to run ', insert_cities_queries[i]);
  db.query(insert_cities_queries[i], error => {
    if (error) {
      throw error;
    }
    console.log(`record ${i} has been succeeded`);
  });
}

// What are the names of the countries with population greater than 8 million
const select_all = `SELECT * FROM country WHERE Population > 8000000`;
`SELECT * FROM country `;
db.query(select_all, (error, result) => {
  if (error) {
    throw error;
  }
  console.log(`\nNames of the countries with population greater than 8 million:`);
  result.forEach(element => {
    console.log(`${element.Name} => ${element.Population}`);
  });
});

// What are the names of the countries that have “land” in their names ?
const select_lands = `SELECT * FROM country WHERE Name LIKE '%land%' `;
`SELECT * FROM country `;
db.query(select_lands, (lands_error, result) => {
  if (lands_error) {
    throw lands_error;
  }
  console.log(`\nNames of the countries that have “land” in their names:`);
  result.forEach(land => {
    console.log(land.Name);
  });
});

// What are the names of the cities with population in between 500,000 and 1 million ?
const cities_population = `SELECT * FROM city WHERE Population BETWEEN 500000 AND 1000000 `;
db.query(cities_population, (error, result) => {
  if (error) {
    throw error;
  }
  console.log(`\nNames of the cities with population in between 500,000 and 1 million :`);
  result.forEach(city => {
    console.log(city.Name);
  });
});

// What are the names of all the countries on the continent ‘Europe’ ?
const select_europe = `SELECT * FROM country WHERE Continent = 'Europe' `;
`SELECT * FROM country `;
db.query(select_europe, (error, result) => {
  if (error) {
    throw error;
  }
  console.log(`\nCountries of ‘Europe’:`);
  result.forEach(europe => {
    console.log(europe.Name);
  });
});

// List all the countries in the descending order based on their surface areas.
const SurfaceAreas = `SELECT * FROM country ORDER BY SurfaceArea DESC`;
db.query(SurfaceAreas, (error, result) => {
  if (error) {
    throw error;
  }
  console.log(`\nAll the countries in the descending order based on their surface areas:`);
  result.forEach(SurfaceArea => {
    console.log(`${SurfaceArea.Name} => ${SurfaceArea.SurfaceArea}`);
  });
});

// What are the names of all the cities in the Netherlands?
const names = `SELECT * FROM city WHERE CountryCode = 'NLD'`;
db.query(names, (error, result) => {
  if (error) {
    throw error;
  }
  console.log(`\nNames of all the cities in the Netherlands:`);
  result.forEach(element => {
    console.log(element.Name);
  });
});

// What's the population of Rotterdam?
const rotterdam = `SELECT * FROM city WHERE Name = 'Rotterdam' `;
db.query(rotterdam, (error, result) => {
  if (error) {
    throw error;
  }
  console.log(`\nPopulation of Rotterdam:`);
  result.forEach(element => {
    console.log(element.Population);
  });
});

// What's the top 10 countries based on surface area?
const topTen = `SELECT * FROM country ORDER BY SurfaceArea DESC  LIMIT 10 `;
db.query(topTen, (error, result) => {
  if (error) {
    throw error;
  }
  console.log(`\nTop 10 countries based on surface area:`);
  result.forEach(element => {
    console.log(element.Name);
  });
});

// What's the top 10 cities with the highest population?
const topCities = `SELECT * FROM city ORDER BY population DESC LIMIT 10 `;
db.query(topCities, (error, result) => {
  if (error) {
    throw error;
  }
  console.log(`\nTop 10 cities with the highest population:`);
  result.forEach(element => {
    console.log(`${element.Name} => ${element.Population}`);
  });
});

// const worldPopulation = `SELECT * FROM country `;
const worldPopulation = `select sum(population) as total from country`;
db.query(worldPopulation, (error, result) => {
  if (error) {
    throw error;
  }
  result.forEach(element => {
    console.log(`\nTop 10 cities with the highest population:\n${element['total']}`);
  });
});

db.end();
