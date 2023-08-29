const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "password",
  database: "HYF",
});

connection.connect((err) => {
  if (err) {
    console.error("Can't connect to the database:", err);
    return;
  }
  console.log("Connected to the database!");

  
  const addMentorColumnQuery = `
  ALTER TABLE authors
  ADD COLUMN mentor INT,
  ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_id);
`;

connection.query(addMentorColumnQuery, (err, results) => {
  if (err) {
    console.error("Error adding mentor column:", err);
    connection.end();
  } else {
    console.log("Mentor column added successfully.");
    

  
  const insertAuthors = `
  INSERT INTO authors (author_id, author_name, university, date_of_birth, h_index, gender,mentor)
  VALUES
  (1, 'MOhamed', 'University 1', '1993-09-15', 4, 'Male', 1),
  (2, 'Alice', 'University 2', '1992-05-15', 8, 'Female', 1),
  (3, 'John', 'University 3', '1989-11-03', 9, 'Male', 2),
  (4, 'Emily', 'University 4', '1991-08-20', 7, 'Female', Null),
  (5, 'Michael', 'University 5', '1995-02-10', 10, 'Male', 1),
  (6, 'Sophia', 'University 6', '1993-06-27', 8, 'Female', 4),
  (7, 'David', 'University 7', '1990-12-12', 9, 'Male', 3),
  (8, 'Olivia', 'University 8', '1994-09-08', 7, 'Female', 2),
  (9, 'Daniel', 'University 9', '1988-04-25', 10, 'Male', 1),
  (10, 'Emma', 'University 10', '1996-07-18', 8, 'Female', Null),
  (11, 'James', 'University 11', '1993-10-30', 9, 'Male', 2),
  (12, 'Ava', 'University 12', '1991-03-22', 7, 'Female', 1),
  (13, 'Matthew', 'University 13', '1989-09-14', 10, 'Male', 3),
  (14, 'Isabella', 'University 14', '1997-12-05', 8, 'Female', 5),
  (15, 'Andrew', 'University 15', '1992-02-28', 9, 'Male', 2);
  
  
  `;
  

  const insertPapers = `
    INSERT INTO research_papers (paper_id, paper_title, conference, publish_date)
    VALUES
    (1, 'Paper Title 1', 'Conference 1', '2023-01-15'),
  (2, 'Paper Title 2', 'Conference 2', '2023-02-20'),
  (3, 'Paper Title 3', 'Conference 3', '2022-12-10'),
  (4, 'Paper Title 4', 'Conference 4', '2022-11-05'),
  (5, 'Paper Title 5', 'Conference 5', '2021-08-30'),
  (6, 'Paper Title 6', 'Conference 6', '2021-06-22'),
  (7, 'Paper Title 7', 'Conference 7', '2020-10-18'),
  (8, 'Paper Title 8', 'Conference 8', '2020-09-03'),
  (9, 'Paper Title 9', 'Conference 9', '2019-12-25'),
  (10, 'Paper Title 10', 'Conference 10', '2019-11-15'),
  (11, 'Paper Title 11', 'Conference 1', '2018-04-12'),
  (12, 'Paper Title 12', 'Conference 2', '2017-07-30'),
  (13, 'Paper Title 13', 'Conference 3', '2016-11-22'),
  (14, 'Paper Title 14', 'Conference 4', '2016-09-15'),
  (15, 'Paper Title 15', 'Conference 5', '2015-12-05'),
  (16, 'Paper Title 16', 'Conference 6', '2014-08-18'),
  (17, 'Paper Title 17', 'Conference 7', '2013-10-28'),
  (18, 'Paper Title 18', 'Conference 8', '2013-05-01'),
  (19, 'Paper Title 19', 'Conference 9', '2012-03-15'),
  (20, 'Paper Title 20', 'Conference 10', '2012-01-10'),
  (21, 'Paper Title 21', 'Conference 1', '2011-09-22'),
  (22, 'Paper Title 22', 'Conference 2', '2010-07-09'),
  (23, 'Paper Title 23', 'Conference 3', '2010-02-14'),
  (24, 'Paper Title 24', 'Conference 4', '2009-12-03'),
  (25, 'Paper Title 25', 'Conference 5', '2008-08-26'),
  (26, 'Paper Title 26', 'Conference 6', '2007-06-17'),
  (27, 'Paper Title 27', 'Conference 7', '2007-03-28'),
  (28, 'Paper Title 28', 'Conference 8', '2006-11-10'),
  (29, 'Paper Title 29', 'Conference 9', '2005-09-20'),
  (30, 'Paper Title 30', 'Conference 10', '2005-04-01')
  `;

  const insertAuthorPaper = `
    INSERT INTO author_paper (author_id, paper_id)
    VALUES
    (1, 1),
    (2, 1),
    (2, 2),
    (3, 3),
    (3, 4),
    (4, 5),
    (5, 6),
    (6, 7),
    (7, 8),
    (8, 9),
    (8, 10),
    (9, 11),
    (9, 12),
    (10, 13),
    (10, 14),
    (10, 15),
    (11, 16),
    (12, 17),
    (12, 18),
    (13, 19),
    (13, 20),
    (14, 21),
    (14, 22),
    (15, 23),
    (15, 24),
    (15, 25),
    (15, 26),
    (15, 27),
    (6, 28),
    (15, 29),
    (12, 30);
  `;

  connection.query(insertAuthors, (err, results) => {
    if (err) {
      console.error("Error in adding the authors:", err);
      connection.end();
    } else {
      console.log("Authors were added.");

      connection.query(insertPapers, (err, results) => {
        if (err) {
          console.error("Error inserting research papers:", err);
          connection.end();
        } else {
          console.log("Research papers inserted successfully.");

          connection.query(insertAuthorPaper, (err, results) => {
            if (err) {
              console.error("Error inserting author-paper relationships:", err);
            } else {
              console.log("Author-paper relationships inserted successfully.");
            }

            connection.end();
          });
        }
      });
    }
  });
});
