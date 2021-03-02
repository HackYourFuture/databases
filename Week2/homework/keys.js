const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "tarek123321",
});

const createQueries = (query) => {
    db.query(query, (error, results) => {
        if (error) {
            throw error;
        } else {
            console.log("Query Created  ", results);
        }
    });
};

// creating the database for the week2 exercises
createQueries("CREATE DATABASE IF NOT EXISTS WEEK2");
// use the database after creating it
createQueries("USE WEEK2");
// Create a table, called authors. Give it the following fields: (author_no(Primary Key), author_name, university, date_of_birth, h_index, gender)
createQueries(
    "CREATE TABLE IF NOT EXISTS authors (author_no INT NOT NULL AUTO_INCREMENT, author_name VARCHAR(55), university VARCHAR(55), date_of_birth DATE, h_index INT, gender ENUM('m','f'), CONSTRAINT pk_author PRIMARY KEY(author_no))"
);
// Write a query that adds a column called mentor to authors table that references the column author_no. For integrity add a foreign key on this column.

createQueries(
    "ALTER TABLE authors ADD mentor INT, ADD CONSTRAINT fk_author FOREIGN KEY (mentor) REFERENCES authors(author_no)"
);

/*createQueries(`SET FOREIGN_KEY_CHECKS = 0`);
 createQueries(`drop table research_papers`);
createQueries(`drop table authors`);
createQueries(`drop table papers_details`);*/
db.end();
