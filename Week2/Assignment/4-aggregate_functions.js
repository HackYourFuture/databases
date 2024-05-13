// Write some queries to retrieve the following rows:

// All research papers and the number of authors that wrote that paper.
// Sum of the research papers published by all female authors.
// Average of the h-index of all authors per university.
// Sum of the research papers of the authors per university.
// Minimum and maximum of the h-index of all authors per university.

const { connection, execQuery } = require('./database_connection');
const { EX_4_QUERIES } = require('./queries');

(async () => {
    connection.connect();

    try {

        await Promise.all(EX_4_QUERIES.map(async (query) => {
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