'use strict';
//1-  Use the mysql package (https://www.npmjs.com/package/mysql)

//2-  Make a connection to MySQL, using your MySQL root login credentials

const mysql = require('mysql');
const dataOfCities = require('./city.json');
const dataOfCountries = require('./country.json');

// create connection 
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'mosleh1234',
    database : 'world'
});

// connect 
db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('Mysql connected');
});
//3-  Write JavaScript code that incorporates SQL commands for the following:
// 3-1 Create database 
let sql = 'CREATE DATABASE IF NOT EXISTS world';


// execute queries 
const execQuery = function(table){
    db.query(table, (err, result) => {
        if (err) throw err;
        
});
}

// 3-2 Create countries table and insert data into it
async function createCountriesTableAndInsertData(){
const CREATE_TABLE_COUNTRIES = `CREATE TABLE IF NOT EXISTS countries (
    name varchar(254) not null,
    continent enum('Asia', 'Africa', 'North America', 'South America', 'Oceania', 'Europe', 'Antarctica'),
    region varchar(254),
    surface_area float,
    indep_year int,
    population int,
    life_expectancy float,
    gnp float,
    gnp_old float,
    local_name varchar(254),
    government_form varchar(254),
    head_of_state varchar(254),
    capital int
        )`;
   try{
        await execQuery(CREATE_TABLE_COUNTRIES);
        console.log("tables countries created...");
        dataOfCountries.forEach(country => {
            let sql1 = 'INSERT IGNORE INTO countries SET ?';
            let query = db.query(sql1, country, (err, result) => {
                if(err) throw err;
            });
           
        });
        console.log('Data imported to countries table')
   } catch (error){
       console.error(error);
   }    
    
}    

createCountriesTableAndInsertData()

// 3-3 Create cities table and insert data into it
async function createCitiesTableAndInsertData() {
const CREATE_TABLE_CITIES = `CREATE TABLE IF NOT EXISTS cities (
  
    name VARCHAR(35) NOT NULL DEFAULT '', 
    countries_code VARCHAR(3) NOT NULL,  
    district VARCHAR(20) NOT NULL DEFAULT '', 
    population INT NOT NULL DEFAULT 0
        )`;
    try{
        await execQuery(CREATE_TABLE_CITIES);
        dataOfCities.forEach(city => {
            let sql1 = 'INSERT INTO cities SET ?';
            let query = db.query(sql1, city, (err, result) => {
                if(err) throw err;
            });
        });
        console.log('Data imported to cities table')
    }catch (error){
       console.error(error);
   }    
}
createCitiesTableAndInsertData()  



// 4- Write queries (that's a technical term meaning 'requests for information from a database') that will retrieve data that answers the following questions:


// Filtering (using async/await to start execute queries after create the tables and import the data )
    async function filtering(sql){
        await createCountriesTableAndInsertData;
        await createCitiesTableAndInsertData;
        let query = db.query(sql, (err, results) => {
            if(err) throw err;
            console.log('answer is', results);
        });
    }
 
//  4-1 What are the names of the countries with population greater than 8 million
let  populationGreaterThanEightMillion = 'SELECT name FROM countries WHERE population > 8000000';
filtering(populationGreaterThanEightMillion);

// 4-2 What are the names of the countries that have “land” in their names ?
let namesHaveLand = "SELECT name FROM countries WHERE name LIKE '%land%'";
filtering(namesHaveLand);

// 4-3 What are the names of the cities with population in between 500,000 and 1 million ?
let populationBetweenHalfAndOneMillion= 'SELECT * FROM cities WHERE Population BETWEEN 500000 AND 1000000';
filtering(populationBetweenHalfAndOneMillion);

// 4-4 What are the names of all the countries on the continent ‘Europe’ ?
let countriesInEurope = "SELECT name FROM countries WHERE continent = 'Europe'";
filtering(countriesInEurope);

//4-5 List all the countries in the descending order based on their surface areas.
let countriesInDescendingOrder = "SELECT name FROM countries ORDER BY surface_area DESC "
filtering(countriesInDescendingOrder);

