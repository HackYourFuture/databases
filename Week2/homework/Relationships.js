const mysql = require("mysql");
const fs = require("fs");
const util = require("util");
const connectionConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "tarek123321",
};

const createResearchPaperTable = `CREATE TABLE IF NOT EXISTS research_papers (paper_id INT AUTO_INCREMENT, paper_title VARCHAR(250), conference VARCHAR(250), publish_date DATE, CONSTRAINT pk_research_papers PRIMARY KEY(paper_id))`;

const createPapersDetails = `CREATE TABLE IF NOT EXISTS papers_details (id INT AUTO_INCREMENT, author_no INT, paper_id INT, PRIMARY KEY(id), CONSTRAINT fk_auth FOREIGN KEY (author_no) REFERENCES authors(author_no), CONSTRAINT fk_paper FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id))`;

const seedDatabase = async () => {
    const db = mysql.createConnection(connectionConfig);
    const readFile = util.promisify(fs.readFile);
    const execQuery = util.promisify(db.query.bind(db));

    try {
        //make sure that the databaes is created and being used
        await execQuery("CREATE DATABASE IF NOT EXISTS WEEK2");
        await execQuery("USE WEEK2");
        //Create another table, called research_Papers with the following fields: (paper_id, paper_title, conference, publish_date, ...)
        //What is the relationship between Authors and Research papers ? Make necessary changes to authors and research_Papers tables and add more tables if necessary.
        // the relationship is many to many, cause one authors might write one paper also one papaer might be written by more than one author so we need to create third table
        // setting the constrain check to 0
        await execQuery(`SET FOREIGN_KEY_CHECKS = 0`);
        //create research_Papers table and paper details
        await execQuery(createResearchPaperTable);
        await execQuery(createPapersDetails);

        //parsing data to json and inserting data
        const authorsDetails = await readFile(__dirname + "/authorsDetails.json", "utf8");
        const authors = JSON.parse(authorsDetails);
        const authorsPromise = authors.forEach(author => execQuery("INSERT INTO authors SET ?", author)
        );

        const researchPapersData = await readFile(__dirname + '/researchPapers.json' , 'utf8');
        const researchPapers = JSON.parse(researchPapersData);
        const researchPapersPromise =  researchPapers.forEach(paper => execQuery('INSERT INTO research_papers SET ?' , paper));

        const researchPapersDetailsData = await readFile(__dirname + '/papersDetail.json' , 'utf8');
        const researchPapersDetails = JSON.parse(researchPapersDetailsData);
        const papersDetailsPromise =  researchPapersDetails.forEach(paper => execQuery('INSERT INTO papers_details SET ?' , paper));


        await Promise.all(authorsPromise , researchPapersPromise , papersDetailsPromise);

       
        // setting the constrain check to 1
        await execQuery(`SET FOREIGN_KEY_CHECKS = 1`);

        db.end();
    } catch (err) {
        console.error(err.message);

        db.end();
    }
};

seedDatabase();








