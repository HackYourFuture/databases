import {createNewConnection, useDatabase} from './connection_query.js';

const connection = createNewConnection();

const getPapersAndAuthorCount = () => {
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


const getSumOfPapersByFemaleAuthors = () => {
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



const getAverageHIndexPerUniversity = () => {
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


const getSumOfPapersPerUniversity = () => {
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



const getMinMaxHIndexPerUniversity = () => {
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


const exerciseFour = async () => {
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
        await useDatabase();                  // Ensure the database is selected
        await getPapersAndAuthorCount();      // Get all research papers and number of authors
        await getSumOfPapersByFemaleAuthors();// Get sum of research papers by female authors
        await getAverageHIndexPerUniversity();// Get average h-index per university
        await getSumOfPapersPerUniversity();  // Get sum of research papers per university
        await getMinMaxHIndexPerUniversity(); // Get min and max h-index per university
    } catch (err) {
        console.error('An error occurred:', err);
    } finally {
        connection.end();                     // Close the connection after all operations
    }
};

// Only run this script if it's executed directly (not imported)
if (require.main === module) {
    exerciseFour();
}
