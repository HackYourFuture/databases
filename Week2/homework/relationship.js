const util = require("util");
const mysql = require("mysql");
const fs = require("fs");


const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "homework_database"
});

const execQuery = util.promisify(connection.query.bind(connection));
const readFile = util.promisify(fs.readFile);



async function seedDatabase() {

    const CREATE_PAPER = `
    CREATE TABLE IF NOT EXISTS research_papers(
    paper_id INT PRIMARY KEY AUTO_INCREMENT,
    paper_title varchar(100),
    conference varchar(50),
    publish_date DATE
    );`;


    const CREATE_RELATION = `
    CREATE TABLE IF NOT EXISTS author_paper(
    author_no INT,
    paper_id INT,
    CONSTRAINT FK_Author FOREIGN KEY(author_no) REFERENCES authors(author_no),
    CONSTRAINT FK_Paper FOREIGN KEY(paper_id) REFERENCES research_papers(paper_id),
    CONSTRAINT PK_Author_Paper PRIMARY KEY(author_no, paper_id) 
    ); `;

    connection.connect();

    try {
        await Promise.all[execQuery(CREATE_PAPER), execQuery(CREATE_RELATION)];

        const authorsData = await readFile(__dirname + "/authors.json", "utf8");
        const authors = await JSON.parse(authorsData);

        await Promise.all(
            authors.map(author => {
                execQuery(`INSERT INTO authors SET ?`, author)
            })
        );

        const paperData = await readFile(__dirname + "/researchPapers.json", "utf8");
        const papers = await JSON.parse(paperData);

        await Promise.all(
            papers.map(paper => {
                execQuery(`INSERT INTO research_papers SET ?`, paper)
            })
        );

        const authorPaperData = await readFile(__dirname + "/authorPaper.json", "utf8");
        const authorPapers = await JSON.parse(authorPaperData);

        await Promise.all(
            authorPapers.map(authorPaper => {
                execQuery(`INSERT INTO author_paper SET ?`, authorPaper)
            })
        );


    } catch (error) {
        console.error(error);
        connection.end();
    }

    connection.end();

}
seedDatabase();
