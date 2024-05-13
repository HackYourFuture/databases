// Create another table, called research_Papers with the following fields: (paper_id, paper_title, conference, publish_date, ...)
// What is the relationship between Authors and Research papers ? Make necessary changes to authors and research_Papers tables and add more tables if necessary.
// Read exercises 3 and 4 and then add information (insert rows) of 15 authors and 30 research papers such that all queries in the exercises 3 and 4 will return some answers

const { connection, execQuery } = require('./database_connection');
const { CREATE_RESEARCH_PAPERS_TABLE, CREATE_AUTHORS_RESEARCH_PAPERS_TABLE, disable_fk_checks, enable_fk_checks, INSERT_INTO_AUTHORS, INSERT_INTO_RESEARCH_PAPERS, INSERT_INTO_AUTHORS_RESEARCH_PAPERS } = require('./queries');

(async () => {
    connection.connect();

    try {

        await Promise.all([
            execQuery(CREATE_RESEARCH_PAPERS_TABLE),
            execQuery(CREATE_AUTHORS_RESEARCH_PAPERS_TABLE),
            execQuery(disable_fk_checks),
            execQuery(INSERT_INTO_AUTHORS),
            execQuery(INSERT_INTO_RESEARCH_PAPERS),
            execQuery(INSERT_INTO_AUTHORS_RESEARCH_PAPERS),
            execQuery(enable_fk_checks)
        ]);

    } catch (error) {
        console.error(error);
    }

    connection.end();
})();