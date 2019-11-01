const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password : 'hyfpassword',
    database: 'world'
})

connection.connect();
const createTable= [
    "create table country (Name varchar(50), Continent varchar(50), Region varchar(50), SurfaceArea int, IndepYear int,Population int,LifeExpectancy int,GNP int,GNPOld int,LocalName varchar(50),GovermentForm varchar(50),HeadOfState varchar(50),Capital varchar(50))",
    "create table city (ID int, Name varchar(50), CountryCode varchar(10), District varchar(50),Population int )"
  ];
  createTable.forEach(table => {
    connection.query(table, (error, results, fields) => {
        if(error){
            throw error;
        }
    })
})


  const countryInfo = [
    "insert into  country values ( 'Netherlands','Europe','Western Europe', 42508, 1945, 17000000, 82, 901, 890,'Netherlands','parliamentary','Willem-Alexander','Amsterdam')",
    "insert into country values ( 'Belgium', 'Europe', 'Western Europe', 30518, 1830, 10239000, 78, 249704, 243948, 'Belgae', 'Constitutional Monarchy, Federation', 'Albert II', 'Brussels')",
    "insert into country values ( 'Germany', 'Europe', 'Western Europe', 357022, 1955, 82164700, 77, 2133367, 2102826, 'Deutschland', 'Federal Republic', 'Johannes Rau', 'Berlin')",
    "insert into country values ( 'France', 'Europe', 'Western Europe', 551500, 843, 59225700, 79, 1424285, 1392448, 'France', 'Republic', 'Emmanuel Macron', 'Paris')",
  ];

  countryInfo.forEach(country => {
      connection.query(country, (error, results, fields) => {
          if(error){
              throw error;
          }
      })
  })

  const cities = [
    "insert into  city values (1, 'Amsterdam', 'NL', 'NorthHolland', 863202 )",
    "insert into  city values (2, 'Rotterdam', 'NL', 'SouthHolland', 644527 )",
    "insert into city values (3, 'Utrecht', 'NL', 'Utrecht', '234323')",
    "insert into city values (4, 'Den Haag', 'NL', 'Zuid-Holland', '440900')",
  ];

  cities.forEach(city => {
    connection.query(city, (error, results, fields) => {
        if(error){
            throw error;
        }
    })
})

connection.end();