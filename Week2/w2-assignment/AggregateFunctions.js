const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  multipleStatements: true,
  database: authors,
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");

  const query = `
SELECT 
  rp.paper_id,
  rp.paper_title,
  COUNT(ap.author_id) AS num_authors
FROM 
  research_papers rp
LEFT JOIN 
  author_papers ap ON rp.paper_id = ap.paper_id
GROUP BY 
  rp.paper_id, rp.paper_title;


SELECT 
  a.gender,
  SUM(CASE WHEN a.gender = 'female' THEN 1 ELSE 0 END) AS papers_published_by_female_authors
FROM 
  authors a
JOIN 
  author_papers ap ON a.author_id = ap.author_id
GROUP BY 
  a.gender;

  

SELECT 
  university,
  AVG(h_index) AS avg_h_index_per_university
FROM 
  authors
GROUP BY 
  university;



SELECT 
  a.university,
  COUNT(ap.paper_id) AS total_papers_per_university
FROM 
  authors a
LEFT JOIN 
  author_papers ap ON a.author_id = ap.author_id
GROUP BY 
  a.university;




SELECT 
  university,
  MIN(h_index) AS min_h_index,
  MAX(h_index) AS max_h_index
FROM 
  authors
GROUP BY 
  university;



  `;

  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    console.log("SQL statements executed successfully", results);
    connection.end();
  });
});
