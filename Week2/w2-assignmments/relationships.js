import { createConnection } from 'mysql2/promise';

const connection = await createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'authors',
});

try {
  // Drop tables if they exist
  await connection.query(`DROP TABLE IF EXISTS author_paper`);
  await connection.query(`DROP TABLE IF EXISTS research_papers`);

  // Create research_papers table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS research_papers (
      paper_id INT AUTO_INCREMENT PRIMARY KEY,
      paper_title VARCHAR(255) NOT NULL,
      conference VARCHAR(255),
      publish_date DATE
    )
  `);

  // Create author_paper relationship table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS author_paper (
      author_id INT,
      paper_id INT,
      PRIMARY KEY (author_id, paper_id),
      FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE,
      FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id) ON DELETE CASCADE
    )
  `);

  // Insert authors
  const insert_authors_query = `
    INSERT INTO authors (author_name, university, date_of_birth, h_index, gender) VALUES   
    ('Alice Smith', 'Harvard', '1985-06-15', 42, 'female'),
    ('Bob Johnson', 'MIT', '1980-08-22', 38, 'male'),
    ('Charlie Davis', 'Stanford', '1992-03-10', 25, 'male'),
    ('Diana Miller', 'Oxford', '1987-11-05', 33, 'female'),
    ('Edward Wilson', 'Cambridge', '1995-02-18', 20, 'male'),
    ('Fiona Brown', 'Princeton', '1990-09-30', 45, 'female'),
    ('George Clark', 'Yale', '1988-07-12', 29, 'male'),
    ('Hannah White', 'Columbia', '1991-05-21', 35, 'female'),
    ('Isaac Adams', 'UC Berkeley', '1993-12-14', 40, 'male'),
    ('Julia Thomas', 'UCLA', '1986-04-09', 27, 'female'),
    ('Kevin Green', 'Duke', '1997-06-23', 22, 'male'),
    ('Laura Baker', 'NYU', '1994-02-11', 31, 'female'),
    ('Michael Turner', 'Cornell', '1990-01-25', 36, 'male'),
    ('Nancy Hall', 'Johns Hopkins', '1989-11-13', 39, 'female'),
    ('Oliver Young', 'UPenn', '1987-03-17', 30, 'male');
  `;
  await connection.query(insert_authors_query);
  console.log('Authors inserted successfully.');

  // Insert research papers
  const insertPapers = `
    INSERT INTO research_papers (paper_title, conference, publish_date) VALUES
    ('AI in Healthcare', 'NeurIPS', '2022-12-01'),
    ('Quantum Computing', 'ICML', '2021-07-15'),
    ('Blockchain for Security', 'CVPR', '2023-05-10'),
    ('Deep Learning for NLP', 'ACL', '2022-08-30'),
    ('Cybersecurity in IoT', 'BlackHat', '2023-06-20'),
    ('Big Data Analysis', 'SIGKDD', '2021-09-18'),
    ('5G Networks Optimization', 'IEEE INFOCOM', '2023-03-25'),
    ('Climate Change Modeling', 'AAAS', '2022-10-11'),
    ('CRISPR Gene Editing', 'Nature Genetics', '2023-01-05'),
    ('Autonomous Vehicles', 'CVPR', '2022-07-29'),
    ('Quantum Cryptography', 'QCRYPT', '2021-11-14'),
    ('Neuroscience & AI', 'AAAI', '2023-04-22'),
    ('Dark Matter Detection', 'APS', '2022-12-09'),
    ('Cancer Drug Discovery', 'ASCO', '2023-05-15'),
    ('Renewable Energy Tech', 'Energy Conference', '2021-06-28'),
    ('Space Exploration AI', 'NASA Symposium', '2022-09-13'),
    ('Smart Cities & IoT', 'CES', '2023-02-17'),
    ('Microchip Innovations', 'IEEE ICASSP', '2021-10-07'),
    ('Brain-Computer Interfaces', 'Neuralink', '2023-03-11'),
    ('AI Ethics & Bias', 'IJCAI', '2022-05-24'),
    ('Social Media & Misinformation', 'WWW', '2023-07-19'),
    ('Cryptocurrency Trends', 'Crypto Summit', '2022-11-30'),
    ('Virtual Reality Research', 'VR Conference', '2021-08-21'),
    ('AI-Powered Assistants', 'NeurIPS', '2023-01-12'),
    ('Genomics & Machine Learning', 'ISMB', '2022-04-09'),
    ('Predictive Analytics in Business', 'INFORMS', '2023-06-05'),
    ('Astrobiology Research', 'SETI Conference', '2022-10-18'),
    ('Medical Imaging AI', 'RSNA', '2021-12-06'),
    ('AI in Finance', 'Quant Summit', '2023-09-25'),
    ('Computer Vision for Agriculture', 'CVPR', '2022-03-14');
  `;
  await connection.query(insertPapers);
  console.log('Research papers inserted successfully.');

  // Insert author-paper relationships
  const insertAuthorPaper = `
    INSERT INTO author_paper (author_id, paper_id) VALUES
    (1, 1), (1, 2), (2, 3), (2, 4), (3, 5), (3, 6),
    (4, 7), (4, 8), (5, 9), (5, 10), (6, 11), (6, 12),
    (7, 13), (7, 14), (8, 15), (8, 16), (9, 17), (9, 18),
    (10, 19), (10, 20), (11, 21), (11, 22), (12, 23), (12, 24),
    (13, 25), (13, 26), (14, 27), (14, 28), (15, 29), (15, 30);
  `;
  await connection.query(insertAuthorPaper);
  console.log('Author-paper relationships inserted successfully.');

} catch (err) {
  console.error('Error during setup:', err);
} finally {
  await connection.end();
  console.log('🔚 Connection closed.');
}
