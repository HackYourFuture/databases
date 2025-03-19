import { createConnection } from 'mysql2/promise';

const use_database_query = `USE authors`;

// Create a connection to the 'authors' database
const connection = await createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'authors'
});

// Query to get each author and their mentor's name using a self-join

const author_mentor_query = `SELECT a1.author_name AS author_name,
a2.author_name AS mentor_name
FROM authors a1
LEFT JOIN authors a2 ON a2.mentor_id = a1.author_id`;

// Query to get the list of authors and the research papers they wrote
const author_paper_query = `SELECT authors.author_name, research_papers.paper_title 
FROM authors 
LEFT JOIN author_paper ON authors.author_id = author_paper.author_id 
LEFT JOIN research_papers ON author_paper.paper_id = research_papers.paper_id`;

try {
// Make sure we're using the correct database (optional in this context  
await connection.query(use_database_query);

// Run the author-mentor query and log the result
const [result_author_mentor_query] = await connection.query(author_mentor_query);
console.log(result_author_mentor_query);
const [result_author_paper_query] = await connection.query(author_paper_query);
console.log(result_author_paper_query);
} catch (err) {

// Log any errors that occur during the connection or queries
    console.error('Error connection', err);
 } finally {
// Always close the connection at the end
    await connection.end();
}
