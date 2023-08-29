const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "password",
    database: "HYF",
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected to DataBase`);
  });
  
  connection.query(
    `
    SELECT research_Papers.paper_title,
    (SELECT COUNT(*) FROM papers_by_authors 
    WHERE papers_by_authors.paper_id = research_Papers.paper_id) AS num_authors
    FROM research_Papers;
  `,
    (err, result) => {
      if (err) throw err;
      console.log(result.map((res) => ({ ...res })));
    },
  );
  
  connection.query(
    `
    SELECT COUNT(*)
    FROM authors
    LEFT JOIN papers_by_authors ON authors.author_id = papers_by_authors.author_id
    LEFT JOIN research_Papers ON papers_by_authors.paper_id = research_Papers.paper_id
    WHERE authors.gender = 'Female';
  `,
    (err, result) => {
      if (err) throw err;
      console.log(result);
    },
  );
  
  connection.query(
    `
    SELECT university, AVG(h_index) AS avg_h_index
    FROM authors
    GROUP BY university;
  `,
    (err, result) => {
      if (err) throw err;
      console.log(result.map((res) => ({ ...res })));
    },
  );
  
  connection.query(
    `
    SELECT university, COUNT(paper_title) AS paper_amount
    FROM authors
    JOIN papers_by_authors ON authors.author_id = papers_by_authors.author_id
    JOIN research_Papers ON research_Papers.paper_id = papers_by_authors.paper_id
    GROUP BY university;
  `,
    (err, result) => {
      if (err) throw err;
      console.log(result.map((res) => ({ ...res })));
    },
  );
  
  connection.query(
    `
    SELECT university, MAX(h_index) AS max_h_index, MIN(h_index) AS min_h_index
    FROM authors
    GROUP BY university;
  `,
    (err, result) => {
      if (err) throw err;
      console.log(result.map((res) => ({ ...res })));
    },
  );
  
  connection.end();