import { createConnection } from 'mysql2/promise';

// Create connection to the MySQL database
const use_database_query = `USE authors`;
const connection = await createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'authors'
});

// 1. Query to get all research papers and the number of authors who worked on each
const all_paper_count_author_query = `SELECT paper_title AS 'Title', COUNT(author_name) AS 'Number of authors' 
FROM research_Papers
JOIN author_paper ON research_Papers.paper_id = author_paper.paper_id
LEFT JOIN authors ON author_paper.author_id = authors.author_id
GROUP BY paper_title`;


// 2. Query to count the number of research papers published by female authors
const research_paper_publishing_woman_query = `SELECT COUNT(paper_title) AS 'Sum of the works publishing by woman'
FROM research_Papers
JOIN author_paper ON research_Papers.paper_id = author_paper.paper_id
JOIN authors ON author_paper.author_id = authors.author_id
WHERE gender = 'Female'`;

// 3. Query to calculate the average h-index of authors per university
const average_h_index_query = `SELECT university AS 'University', ROUND(AVG(h_index), 2) AS 'Average h-index' 
FROM authors
GROUP BY university`;

// 4. Query to count the total number of papers associated with each university
const sum_papers_university_query = `SELECT university AS 'University', COUNT(paper_title) AS 'Sum of papers'
FROM research_Papers
JOIN author_paper ON research_Papers.paper_id = author_paper.paper_id
JOIN authors ON author_paper.author_id = authors.author_id
GROUP BY university`;

// 5. Query to find the minimum and maximum h-index per university
const min_max_h_index_university_query = `SELECT university AS 'University', MIN(h_index) AS 'Min h-index', MAX(h_index) AS 'Max h-index' 
FROM authors
GROUP BY university`;

try {
// Run each query and log the results
await connection.query(use_database_query);

const [result_all_paper_count_author_query] = await connection.query(all_paper_count_author_query);
console.log(result_all_paper_count_author_query);

const [result_research_paper_publishing_woman_query] = await connection.query(research_paper_publishing_woman_query);
console.log(result_research_paper_publishing_woman_query);

const [result_average_h_index_query] = await connection.query(average_h_index_query);
console.log(result_average_h_index_query);

const [result_sum_papers_university_query] = await connection.query(sum_papers_university_query);
console.log(result_sum_papers_university_query);

const [result_min_max_h_index_university_query] = await connection.query(min_max_h_index_university_query);
console.log(result_min_max_h_index_university_query);


} catch (err) {console.error('Error connection', err);
 } finally {
    await connection.end();
}
