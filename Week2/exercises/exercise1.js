const util = require('util');
const mysql = require('mysql');
const connection = require('./dbConfig.js');

const execQuery = util.promisify(connection.query.bind(connection));

async function initializeDatabase(){
  const CREATE_AUTHOR = `
    CREATE TABLE IF NOT EXISTS authors (
      author_no INT PRIMARY KEY NOT NULL,
        author_name VARCHAR(100) NOT NULL,
        university VARCHAR(100),
        date_of_birth DATE,
        h_index INT,
        gender ENUM('M', 'F')
    );`;
  const ALTER_AUTHOR_ADD_MENTOR = `
    ALTER TABLE authors
    ADD COLUMN mentor INT,
      ADD CONSTRAINT FOREIGN KEY (mentor) REFERENCES authors(author_no);`;   


  connection.connect();

  try {
    await execQuery(CREATE_AUTHOR);
    await execQuery(ALTER_AUTHOR_ADD_MENTOR);
  } catch (error) {
    console.error(error);
    connection.end();
  }
  
  connection.end();

}

initializeDatabase();