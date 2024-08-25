//C:\Users\knowl\Documents\hyf\databases\Week2\exercise_4.js
import {createNewConnection, useDatabase} from './connection_query.js';
import path from 'path';

console.log(`running the file exercise_4.js`);
const connection = createNewConnection();

const getPapersAndAuthorCount = (connection)  => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                research_papers.paper_title,
                COUNT(author_papers.author_id) AS author_count
            FROM 
                research_papers
            LEFT JOIN 
                author_papers ON research_papers.paper_id = author_papers.paper_id
            GROUP BY 
                research_papers.paper_id;
        `;
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching papers and author count:', err.stack);
                reject(err);
                return;
            }
            console.log('Research papers and number of authors:');
            console.table(results);
            resolve();
        });
    });
};


const getSumOfPapersByFemaleAuthors = (connection)  => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                SUM(IF(authors.gender = 'Female', 1, 0)) AS female_author_paper_count
            FROM 
                author_papers
            LEFT JOIN 
                authors ON author_papers.author_id = authors.author_id;
        `;
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching sum of papers by female authors:', err.stack);
                reject(err);
                return;
            }
            console.log('Sum of research papers published by all female authors:');
            console.table(results);
            resolve();
        });
    });
};



const getAverageHIndexPerUniversity = (connection)  => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                university,
                AVG(h_index) AS average_h_index
            FROM 
                authors
            GROUP BY 
                university;
        `;
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching average h-index per university:', err.stack);
                reject(err);
                return;
            }
            console.log('Average h-index of all authors per university:');
            console.table(results);
            resolve();
        });
    });
};


const getSumOfPapersPerUniversity = (connection)  => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                authors.university,
                COUNT(author_papers.paper_id) AS total_papers
            FROM 
                authors
            LEFT JOIN 
                author_papers ON authors.author_id = author_papers.author_id
            GROUP BY 
                authors.university;
        `;
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching sum of papers per university:', err.stack);
                reject(err);
                return;
            }
            console.log('Sum of research papers of the authors per university:');
            console.table(results);
            resolve();
        });
    });
};



const getMinMaxHIndexPerUniversity = (connection)  => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                university,
                MIN(h_index) AS min_h_index,
                MAX(h_index) AS max_h_index
            FROM 
                authors
            GROUP BY 
                university;
        `;
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching min and max h-index per university:', err.stack);
                reject(err);
                return;
            }
            console.log('Minimum and maximum h-index of all authors per university:');
            console.table(results);
            resolve();
        });
    });
};


const exerciseFour = async (connection) => {
    /*Prevents the connection from running twice*/
// Check if connect() has already been called on this instance
    console.log('Attempting to connect to the database...');
    if (!connection._connectCalled) {
        connection.connect(err => {
            if (err) {
                return console.error('Connection error: ' + err.stack);
            }
            console.log('Connected!');
        });
    } else {
        console.log('Connection already established.');
    }
    try {
        await useDatabase(connection);                  // Ensure the database is selected
        await getPapersAndAuthorCount(connection) ;      // Get all research papers and number of authors
        await getSumOfPapersByFemaleAuthors(connection) ;// Get sum of research papers by female authors
        await getAverageHIndexPerUniversity(connection) ;// Get average h-index per university
        await getSumOfPapersPerUniversity(connection) ;  // Get sum of research papers per university
        await getMinMaxHIndexPerUniversity(connection) ; // Get min and max h-index per university
    } catch (err) {
        console.error('An error occurred:', err);
    } finally {
        connection.end();                     // Close the connection after all operations
    }
};


// console.log(`import.meta.url: ${import.meta.url}`);
// console.log(`file://${process.argv[1]}`);
// const filePath = `file://${path.resolve(process.argv[1]).replace(/\\/g, '/')}`;
// console.log(`Normalized file path: ${filePath}`);

// Only run this script if it's executed directly (not imported)~
// ~because running the script on import causes duplicated connections

/* `file://${process.argv[1]}` is used to get the full path to the script that is being executed
* `file://${process.argv[1]}` is compared to import.meta.url to determine if the current module is the main module*/
// if (import.meta.url === filePath) {
//     console.log('Executing exerciseFour function.');
//     exerciseFour(connection);
// } else {
//     console.log('Condition not met, not executing exerciseFour.');
// }


exerciseFour(connection);
