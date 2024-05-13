// Write a query that prints names of all authors and their corresponding mentors.
// Write a query that prints all columns of authors and their published paper_title. If there is an author without any research_Papers, print the information of that author too.

const { connection, execQuery } = require('./database_connection');
const { EX_3_QUERIES } = require('./queries');

(async () => {
    connection.connect();

    try {

        await Promise.all(EX_3_QUERIES.map(async (query) => {
            const results = await execQuery(query.query);
            console.table(query.question);
            console.table(results);
            return results;
        }));
        

    } catch (error) {
        console.error(error);
    }

    connection.end();
})();