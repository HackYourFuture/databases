const at = `select rp.paper_title, count(distinct a.author_no) as 'numbOfAuthors' from author_paper a right join research_papers rp on rp.paper_id = a.paper_id group by rp.paper_id;`;

const util = require("util");
const mysql = require("mysql");


const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "homework_database"
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {

    connection.connect();

    try {
        const papersNumberOfAuthors = `
        select rp.paper_title,
         count(distinct a.author_no) as 'numbOfAuthors'
          from author_paper a
           right join research_papers rp
            on rp.paper_id = a.paper_id
             group by rp.paper_id;`;

        const paperByFemale = `
             select count(rp.paper_id)
              from author_paper ap 
              join research_papers rp 
              on ap.paper_id = rp.paper_id 
              right join authors a 
              on a.author_no = ap.author_no 
              where a.gender='f';
             `;
        const avgHIndex = `
        select avg(h_index) 
        from authors 
        group by(university);
        `;

        const paperPerUniversity = `
        select count(distinct ap.paper_id),a.university 
        from authors a 
        join author_paper ap 
        on a.author_no = ap.author_no 
        group by a.university;
        `;

        const hindexPerUniversity = `
        select min(h_index), max(h_index),university
         from authors 
         group by(university);
        `;

        console.log(await execQuery(papersNumberOfAuthors))
        console.log(await execQuery(paperByFemale))
        console.log(await execQuery(avgHIndex))
        console.log(await execQuery(paperPerUniversity))
        console.log(await execQuery(hindexPerUniversity))

    } catch (error) {
        console.error(error);
        connection.end();
    }

    connection.end();
}
seedDatabase()