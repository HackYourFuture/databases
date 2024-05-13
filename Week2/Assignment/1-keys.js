// Create a table, called authors. Give it the following fields: (author_id(Primary Key), author_name, university, date_of_birth, h_index, gender)
// Write a query that adds a column called mentor to authors table that references the column author_id. For integrity add a foreign key on this column.

const { connection, execQuery } = require('./database_connection');
const { CREATE_DATABASE, CREATE_AUTHORS_TABLE, ADD_MENTOR_COLUMN } = require('./queries');

(async () => {
    connection.connect();

    try {

        await Promise.all([
            CREATE_DATABASE.map(query => execQuery(query)),
            execQuery(CREATE_AUTHORS_TABLE),
            execQuery(ADD_MENTOR_COLUMN)
        ]);

    } catch (error) {
        console.error(error);
    }

    connection.end();
})();