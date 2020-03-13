'use strict'

var mysql      = require('mysql');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'world'
});
connection.connect();




// Q1 - greater than 8mil

let q1 = "select name,population from country where population > 8000000 order by population "

connection.query(q1, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("Q1 answer ", results);
});


// Q2 - land in name

let q2 = "select name from country where name like '%land%'"

connection.query(q2, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("Q2 answer ", results);
});


// Q3 - population between 500K & 1Mil

let q3 = "select name from country where population between 500000 and 1000000"

connection.query(q3, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("Q3 answer ", results);
});


// Q4 - countries in the EU

let q4 = "select name from country where continent = 'europe'"

connection.query(q4, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("Q4 answer ", results);
});


// Q5 - descending order of their surface areas.

let q5 = "select name from country order by surfacearea desc"

connection.query(q5, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("Q5 answer ", results);
});


// Q6 - names of all the cities in the Netherlands?

let q6 = "select name from city where countrycode='nld'"

connection.query(q6, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("Q6 answer ", results);
});


// Q7 - population of Rotterdam?

let q7 = "select population from city where name ='rotterdam'"

connection.query(q7, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("Q7 answer ", results);
});


// Q8 -  top 10 countries by Surface Area

let q8 = "select name from country order by surfacearea desc limit 10"

connection.query(q8, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("Q8 answer ", results);
});


// Q9 - top 10 most populated cities?

let q9 = "select name from city order by population desc limit 10"

connection.query(q9, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("Q9 answer ", results);
});


// Q10 - population number of the world?

let q10 = "select sum(population) from country"

connection.query(q10, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("Q10 answer ", results);
});



connection.end();