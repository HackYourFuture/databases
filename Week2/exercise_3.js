import {createNewConnection, useDatabase} from './connection_query.js';

const connection = createNewConnection();

const getAuthorsAndMentors = (connection) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                a1.author_name AS Author,
                a2.author_name AS Mentor
            FROM 
                authors a1
            LEFT JOIN 
                authors a2 ON a1.mentor = a2.author_id;
        `;
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching authors and mentors:', err.stack);
                reject(err);
                return;
            }
            console.log('Authors and their mentors:');
            console.table(results);
            resolve();
        });
    });
};


const getAuthorsAndPapers = (connection) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                authors.*,
                research_papers.paper_title
            FROM 
                authors
            LEFT JOIN 
                author_papers ON authors.author_id = author_papers.author_id
            LEFT JOIN 
                research_papers ON author_papers.paper_id = research_papers.paper_id;
        `;
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching authors and their papers:', err.stack);
                reject(err);
                return;
            }
            console.log('Authors and their published papers:');
            console.table(results);
            resolve();
        });
    });
};


const exerciseThree = async () => {
    /*Prevents the connection from running twice*/
// Check if connect() has already been called on this instance
    if (!connection._connectCalled) {
        connection.connect(err => {
            if (err) {
                return console.error('Connection error: ' + err.stack);
            }
            console.log('Connected!');
        });
    }
    try {
        await useDatabase(connection);           // Ensure the database is selected
        await getAuthorsAndMentors(connection);  // Get authors and their mentors
        await getAuthorsAndPapers(connection);   // Get authors and their published papers
    } catch (err) {
        console.error('An error occurred:', err);
    } finally {
        connection.end();              // Close the connection after all operations
    }
};


exerciseThree();

