import mysql from "mysql";

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'week2'
});

connection.connect();

//Exercise 1
const createAuthorsTable = [`CREATE TABLE if not exists authors(
    author_id INT AUTO_INCREMENT PRIMARY KEY, 
    author_name VARCHAR(200),
    university VARCHAR(200), 
    date_of_birth Date,
    h_index int ,
    gender ENUM('M','F'))`];

const updateAuthorsTable = [`ALTER TABLE authors
ADD mentor INT NULL REFERENCES authors(author_id);`];

const dropDb = ['DROP DATABASE IF EXISTS week2'];
const createDb = ['CREATE DATABASE IF NOT EXISTS week2'];
const useDb = ['USE week2'];

//Exercise 2
const createResearchPaperTable = [`CREATE TABLE if not exists research_Paper(
    paper_id INT AUTO_INCREMENT PRIMARY KEY,
    paper_title VARCHAR(200),
    conference VARCHAR(200),
    publish_date DATE
    );`];

const authorsWithPapers = [`CREATE TABLE if not exists authorsWithPapers(
        id INT AUTO_INCREMENT PRIMARY KEY,
        author_id INT,
        paper_id INT,
        FOREIGN KEY (author_id) REFERENCES authors(author_id),
        FOREIGN KEY (paper_id) REFERENCES research_Paper(paper_id)
        );`];


const insertIntoAuthors = [`INSERT INTO authors(author_name,university, date_of_birth, h_index,gender,mentor) 
        VALUES
        ("Author1", "University 1", "2020-01-01",1000,"M" , null),
        ("Author2", "University 2", "2020-01-02",1001,"F" , 1),
        ("Author3", "University 3", "2020-01-03",1002,"F" , 1),
        ("Author4", "University 4", "2020-01-04",1003,"M" , 2),
        ("Author5", "University 5", "2020-01-05",1004,"M" , 2),
        ("Author6", "University 6", "2020-01-06",1005,"F" , 4),
        ("Author7", "University 7", "2020-01-07",1006,"F" , 3),
        ("Author8", "University 8", "2020-01-08",1007,"M" , 3),
        ("Author9", "University 9", "2020-01-09",1008,"M" , null),
        ("Author10", "University 10", "2020-01-10",1009,"F" , 4),
        ("Author11", "University 11", "2020-01-11",1010,"F" , 1),
        ("Author12", "University 12", "2020-01-12",1011,"M" , 2),
        ("Author13", "University 13", "2020-01-13",1012,"M" , 4),
        ("Author14", "University 14", "2020-01-14",1013,"F" , null),
        ("Author15", "University 15", "2020-01-15",1014,"F" , 3);
         `];

const insertIntoResearchPaper = [`INSERT INTO research_Paper(paper_title,conference,publish_date)
       VALUES 
       ("Research paper 1", "conference 2", "2020-10-01" ),
       ("Research paper 1", "conference 3", "2020-10-02" ),
       ("Research paper 3", "conference 4", "2020-10-03"  ),
       ("Research paper 3", "conference 5", "2020-10-04"  ),
       ("Research paper 5", "conference 5", "2020-10-05" ),
       ("Research paper 6 ", "conference 7","2020-10-06" ),
       ("Research paper 7 ", "conference 8", "2020-10-07"  ),
       ("Research paper 7", "conference 9", "2020-10-08"  ),
       ("Research paper 9", "conference 10", "2020-10-09" ),
       ("Research paper 10", "conference 11", "2020-10-11" ),
       ("Research paper 11", "conference 12", "2020-10-12"  ),
       ("Research paper 12", "conference 13", "2020-10-13"  ),
       ("Research paper 12", "conference 14", "2020-10-14" ),
       ("Research paper 14", "conference 15", "2020-10-15"  ),
       ("Research paper 15", "conference 16", "2020-10-16"),
       ("Research paper 16", "conference 17", "2020-10-17"),
       ("Research paper 17", "conference 18", "2020-10-18" ),
       ("Research paper 18", "conference 19", "2020-10-19"),
       ("Research paper 18", "conference 20", "2020-10-20" ),
       ("Research paper 20", "conference 21", "2020-10-21" ),
       ("Research paper 21", "conference 22", "2020-10-22" ),
       ("Research paper 22", "conference 23", "2020-10-23" ),
       ("Research paper 23", "conference 24", "2020-10-24" ),
       ("Research paper 24", "conference 25","2020-10-25" ),
       ("Research paper 25", "conference 26", "2020-10-26" ),
       ("Research paper 26", "conference 27", "2020-10-27"),
       ("Research paper 27", "conference 28", "2020-10-28" ),
       ("Research paper 27", "conference 29", "2020-10-29" ),
       ("Research paper 30", "conference 30", "2020-10-30" ),
       ("Research paper 30", "conference 31", "2020-10-10")
    
       `];
const insertIntoAuthorResearchPapers = [`INSERT INTO authorsWithPapers(paper_id,author_id)
       VALUES 
       (5, 1),
       (4 , 6),
       (3 , 7),
       (2 , 4),
       (1 , 5),
       (6 , 6),
       (7 , 9),
       (8, 8),
       (9 , 9),
       (10 , 10),
       (20, 11),
       (19,  12),
       (17, 14),
       (16, 15),
       (15, 1),
       (14, 2),
       (13, 3),
       (12, 4),
       (11, 5),
       (30, 6),
       (29 , 7),
       (28, 8),
       (27, 9),
       (26, 10),
       (25 , 11),
       (24 , 12),
       (23, 13),
       (22, 7);`];

//Exercise 3
const queries = [`SELECT author_name, mentor from authors;`, `SELECT authors.*, rp.paper_title 
FROM authors 
LEFT JOIN authorsWithPapers AS awp
  ON authors.author_id = awp.author_id 
LEFT JOIN research_paper AS rp 
  ON awp.paper_id = rp.paper_id;`];

//Exercise 4
const aggregateQueries = [
    // All research papers and the number of authors that wrote that paper.
    `SELECT rp.paper_title, COUNT(rp.paper_title ) AS "Number of Authors" 
      FROM authors 
      JOIN authorsWithPapers AS awp 
        ON authors.author_id = awp.author_id
      JOIN research_paper AS rp 
        ON awp.paper_id = rp.paper_id 
      GROUP BY rp.paper_title;`,

    // Sum of the research papers published by all female authors.
    `SELECT authors.gender, COUNT(awp.paper_id) AS 'Research Papers by Female'
      FROM research_paper AS rp
      LEFT JOIN authorsWithPapers AS awp 
        ON awp.paper_id = rp.paper_id
      LEFT JOIN authors 
        ON authors.author_id = awp.author_id
      WHERE authors.gender = 'F'
      GROUP BY authors.gender;`,

    // Average of the h-index of all authors per university.
    `SELECT university, AVG(h_index) AS 'AVG of H_INDEX'
      FROM authors
      GROUP BY university;`,

    // Sum of the research papers of the authors per university.
    `SELECT authors.university, COUNT(awp.paper_id) AS 'Sum of the Research Papers'
      FROM authors
      LEFT JOIN authorsWithPapers as awp
        ON awp.author_id = authors.author_id
      GROUP BY authors.university;`,

    //Minimum and maximum of the h-index of all authors per university.
    `SELECT university, MIN(h_index) AS 'MIN', MAX(h_index) AS 'MAX'
      FROM authors
      GROUP BY university;`,
];

function executeQuery(array) {
    array.forEach((query) => {
        connection.query(query, function (error, results) {
            if (error) {
                throw error;
            } else {
                console.table(results);
            }
        });
    });
}
//Exercise 1
executeQuery(dropDb);
executeQuery(createDb);
executeQuery(useDb);
executeQuery(createAuthorsTable);
executeQuery(updateAuthorsTable);

//Exercise 2
executeQuery(createResearchPaperTable);
executeQuery(authorsWithPapers);
executeQuery(insertIntoAuthors);
executeQuery(insertIntoResearchPaper);
executeQuery(insertIntoAuthorResearchPapers);

//Exercise 3
executeQuery(queries);

//Exercise 4
executeQuery(aggregateQueries)
connection.end();