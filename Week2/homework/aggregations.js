const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "tarek123321",
});

db.query("USE week2");

const getInfoFromDatabase = (query) => {
    db.query(query, (error, results) => {
        if (error) {
            throw error;
        }
        console.log("Results", results);
    });
};

//All research papers and the number of authors that wrote that paper.
getInfoFromDatabase(
    `SELECT research_papers.paper_id, COUNT(author_name) AS NumberOfAuthors FROM research_papers JOIN papers_details ON papers_details.paper_id = research_papers.paper_id JOIN authors ON authors.author_no = papers_details.author_no GROUP BY paper_id;`
);
//Sum of the research papers published by all female authors.
getInfoFromDatabase(
    `SELECT COUNT(paper_title) AS papers_by_female_authors FROM research_papers JOIN papers_details ON papers_details.paper_id = research_papers.paper_id JOIN authors on papers_details.author_no = authors.author_no WHERE authors.gender = 'f';`
);
//Average of the h-index of all authors per university.
getInfoFromDatabase(`SELECT university, AVG(h_index) FROM authors GROUP BY university;`);
//Sum of the research papers of the authors per university.
getInfoFromDatabase(
    `SELECT authors.university, COUNT(research_papers.paper_title) AS total FROM research_papers JOIN papers_details ON research_papers.paper_id = papers_details.paper_id JOIN authors ON authors.author_no = papers_details.author_no GROUP BY authors.university;`
);
//Minimum and maximum of the h-index of all authors per university.
getInfoFromDatabase(
    `SELECT university, MAX(h_index) AS Max, MIN(h_index) AS Min FROM authors GROUP BY university;`
);

db.end();
