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
        const authorsWithfriend = `
        SELECT a.author_name AS 'AUTHOR NAME',
        b.author_name AS 'FRIEND NAME'
        FROM authors AS b
        RIGHT JOIN authors AS a
        ON b.author_no = a.friend;`;

        const authorsWithpapers = `
        SELECT a.*,rp.paper_title 
        FROM Authors a 
        LEFT JOIN author_paper p 
        ON (a.author_no = p.author_no)
        LEFT JOIN research_papers rp 
        ON (p.paper_id = rp.paper_id)
        `;

        console.log(await execQuery(authorsWithfriend))
        console.log(await execQuery(authorsWithpapers))

    } catch (error) {
        console.error(error);
        connection.end();
    }

    connection.end();

}
seedDatabase();
