const mysql = require('mysql');

// Prepare connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
});

// Queries in order, to be executed
const queries = [
  { query: 'create database if not exists world', message: 'Database "world" created.' }, // createDB
  { query: 'use world', message: 'Database "world" selected.' }, // select the database
  {
    query: `create table if not exists city
                    (
                      id int not null auto_increment,
                      name varchar(254) not null,
                      country_code varchar(3) not null,
                      district varchar(254) not null,
                      population int,
                      primary key(id)
                    )`,
    message: '"city" table created.',
  }, // createTableCity
  {
    query: `create table if not exists country
                      (
                        id int not null auto_increment,
                        name varchar(254) not null,
                        continent enum('Asia', 'Africa', 'North America', 'South America', 'Antarctica', 'Europe', 'Australia') not null,
                        region varchar(254),
                        surface_area float not null,
                        population int not null,
                        life_expectancy float,
                        gnp float,
                        gnp_old float,
                        local_name varchar(254),
                        government_form varchar(254),
                        head_of_state varchar(254),
                        capital int,
                        primary key(id),
                        foreign key(capital) references city(id)
                      )`,
    message: '"country" table created.',
  }, // createTableCountry
];

// Make the connection to the mysql server
connection.connect(err => {
  if (err) {
    console.error(`Connection Error: ${err.message} (${err.code})`);
    process.exit();
  }
  console.log('Successfully connected to mysql server...');
});

// Execute queries
for (const query of queries) {
  connection.query(query.query, err => {
    if (err) {
      console.error(`Query Error: ${err.message} (${err.code})`);
      connection.end();
      process.exit();
    }
    console.log(query.message);
  });
}

// Before exit, close the connection
connection.end();
