/*
Exercise 1: Keys

Create a table, called Authors. 
Give it the following fields: (author_no(Primary Key), author_name, university, date_of_birth, h_index, gender)
Write a query that adds a foreign key column to Authors table that references the column author_no. Call this column Collaborator.
*/

const mysql = require('mysql');

//create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'Password123^&(',
    database : 'authors_papers'
});

//connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySQL connected...'); 
});

//create database
db.query('CREATE DATABASE IF NOT EXISTS authors_papers', (err, result) => {
    if(err) throw err;
    console.log('Database created');
});

//create a table called authors
db.query('CREATE TABLE IF NOT EXISTS authors(author_no INT PRIMARY KEY, author_name VARCHAR(50), university VARCHAR(20), date_of_birth DATE, h_index INT, gender ENUM("m", "f"))', (err, result) => {
    if(err) throw err;
    console.log('table created');
});

//Write a query that adds a foreign key column to Authors table that references the column author_no. Call this column Collaborator.
db.query('ALTER TABLE authors ADD COLUMN collaborator INT', (err, result) => {
    if(err) throw err;
    console.log('column added');
});

db.query('ALTER TABLE authors ADD CONSTRAINT FK_COLLABORATOR FOREIGN KEY (collaborator) REFERENCES authors(author_no)', (err, result) => {
    if(err) throw err;
    console.log('foreign key added');
});

db.end();
