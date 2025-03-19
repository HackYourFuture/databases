import { createConnection } from 'mysql2/promise';

const use_database_query = `USE authors`;
const connection = await createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'authors'
});

const author_mentor_query = `SELECT a1.author_name AS author_name,
a2.author_name AS mentor_name
FROM authors a1
LEFT JOIN authors a2 ON a2.mentor_id = a1.author_id`;

const author_paper_query = `SELECT authors.author_name, research_papers.paper_title 
FROM authors 
LEFT JOIN author_paper ON authors.author_id = author_paper.author_id 
LEFT JOIN research_papers ON author_paper.paper_id = research_papers.paper_id`;

try {
await connection.query(use_database_query);
const [result_author_mentor_query] = await connection.query(author_mentor_query);
console.log(result_author_mentor_query);
const [result_author_paper_query] = await connection.query(author_paper_query);
console.log(result_author_paper_query);
} catch (err) {
    console.error('Error connection', err);
 } finally {
    await connection.end();
}
