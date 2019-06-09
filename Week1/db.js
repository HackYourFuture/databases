const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to db.');
});

const createDB = `CREATE DATABASE IF NOT EXISTS world`;
db.query(createDB, (err) => {
  if (err) throw err;
  console.log('Database world has been created.');
});

const useDB = `USE world`;
db.query(useDB, (err) => {
  if (err) throw err;
  console.log('DB world selected.');
});

const createCountryTable=`CREATE TABLE IF NOT EXISTS country (
                                                            code CHAR(3), 
                                                            Name CHAR(52), 
                                                            Continent CHAR (30),
                                                            Region CHAR(26),
                                                            SurfaceArea FLOAT(10,2),
                                                            Indepyear SMALLINT(6),
                                                            Population INT(11),
                                                            LifeExpectancy FLOAT(3.1),
                                                            GNP FLOAT(10.2),
                                                            LocalName CHAR(45),
                                                            GovermentForm CHAR(45),
                                                            HeadOfState CHAR(60),
                                                            Capital INT(11),
                                                            Code2 CHAR(2),
                                                            PRIMARY KEY(Code));`;

db.query(createCountryTable, (err) => {
if (err) throw err;
console.log('Country table created.');
});

const createCityTable =`CREATE TABLE IF NOT EXISTS city(
                                                        ID INT(11) AUTO_INCREMENT,
                                                        Name CHAR(35),
                                                        CountryCode CHAR(3),
                                                        District CHAR(20),
                                                        Population INT(11),
                                                        PRIMARY KEY (ID),
                                                        KEY CountryCode (CountryCode))`;
                                                    
db.query(createCityTable, (err) => {
  if (err) throw err;
  console.log('City table created.');
});


// i.
const moreThan80 = `SELECT * FROM country WHERE Population > 8000000`;
db.query(moreThan80, (err, data) => {
  if (err) throw err;
  console.log(`Countries with population more than 8 million:`);
  data.forEach(element => {
    console.log(`${element.Name} => ${element.Population}`);
  });
});

// ii.
const lands = `SELECT * FROM country WHERE Name LIKE '%land%' `;
db.query(lands, (err, data) => {
  if (err) throw err;
  console.log(`Countries with “land” in their names:`);
  data.forEach(element => {
    console.log(element.Name);
  });
});

// iii.
const popBetween = `SELECT * FROM city WHERE Population BETWEEN 500000 AND 1000000 `;
db.query(popBetween, (err, data) => {
  if (err) throw err;
  console.log(`Cities with population between 500K and 1 mil. :`);
  data.forEach(element => {
    console.log(element.Name);
  });
});

// iv.
const europe = `SELECT * FROM country WHERE Continent = 'Europe' `;
`SELECT * FROM country `;
db.query(europe, (err, data) => {
  if (err) throw err;
  console.log(`Countries of Europe:`);
  data.forEach(element => {
    console.log(element.Name);
  });
});

// v.
const surface = `SELECT * FROM country ORDER BY SurfaceArea DESC`;
db.query(surface, (err, data) => {
  if (err) throw err;
  console.log(`All the countries in the descending order based on their surface areas:`);
  data.forEach(element => {
    console.log(`${element.Name} => ${element.SurfaceArea}`);
  });
});


db.end();