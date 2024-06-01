const CREATE_DATABASE = [
    `
        DROP DATABASE IF EXISTS ResearcherHub;
    `,
    `
        CREATE DATABASE IF NOT EXISTS ResearcherHub;
    `,
    `
        USE ResearcherHub;
    `
];

const CREATE_AUTHORS_TABLE = `
    CREATE TABLE IF NOT EXISTS authors (
        author_id INT,
        author_name VARCHAR(50) NOT NULL,
        university VARCHAR(100) NOT NULL,
        date_of_birth DATE NOT NULL,
        h_index INT NOT NULL,
        gender ENUM('m', 'f') NOT NULL,
        PRIMARY KEY (author_id),
        UNIQUE (author_name)
    );
`;

const ADD_MENTOR_COLUMN = `
    ALTER TABLE authors ADD COLUMN mentor INT, ADD FOREIGN KEY (mentor) REFERENCES authors(author_id) ON DELETE CASCADE ON UPDATE CASCADE;
`;

const CREATE_RESEARCH_PAPERS_TABLE = `
    CREATE TABLE IF NOT EXISTS research_papers (
        paper_id INT AUTO_INCREMENT,
        paper_title VARCHAR(200) NULL,
        conference VARCHAR(100) NULL,
        publish_date DATE NULL,
        topic VARCHAR(100) NULL,
        PRIMARY KEY (paper_id),
        UNIQUE (paper_title)
    );
`;

const CREATE_AUTHORS_RESEARCH_PAPERS_TABLE = `
    CREATE TABLE IF NOT EXISTS authors_researchPapers (
        author_id INT,
        paper_id INT,
        PRIMARY KEY (author_id, paper_id),
        FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id) ON DELETE CASCADE ON UPDATE CASCADE
    );
`;

const disable_fk_checks = `SET foreign_key_checks = 0;`;
const enable_fk_checks = `SET foreign_key_checks = 1;`;


const INSERT_INTO_AUTHORS = `
    INSERT INTO authors (author_id, author_name, university, date_of_birth, h_index, gender, mentor)
    VALUES
        (1,'Alice Johnson', 'University of Oxford', '1990-05-15', 8, 'F', 2),
        (2,'Bob Smith', 'University of Pennsylvania', '1985-08-20', 9, 'M', 3),
        (3,'Carol Williams', 'Massachusetts Institute of Technology', '1977-11-10', 10, 'F', 1),
        (4,'David Brown', 'Columbia University', '1988-03-25', 7, 'M', 5),
        (5,'Emma Jones', 'University of Oxford', '1983-09-05', 11, 'F', 4),
        (6,'Frank Davis', 'Columbia University', '1979-06-18', 9, 'M', 6),
        (7,'Grace Wilson', 'Northwestern University', '1981-04-30', 10, 'F', 8),
        (8,'Henry Martinez', 'University of Oxford', '1975-10-12', 8, 'M', 7),
        (9,'Isabella Taylor', 'University of California, Berkeley', '1986-07-22', 12, 'F', 9),
        (10,'James Lee', 'Columbia University', '1984-02-08', 9, 'M', 11),
        (11,'Karen Anderson', 'University of Chicago', '1977-12-28', 10, 'F', 10),
        (12,'Liam Thomas', 'University of Pennsylvania', '1989-09-15', 8, 'M', 12),
        (13,'Mia Garcia', 'Massachusetts Institute of Technology', '1980-01-05', 11, 'F', 14),
        (14,'Noah Harris', 'University of Pennsylvania', '1982-05-20', 9, 'M', 13),
        (15,'Olivia Robinson', 'Northwestern University', '1976-11-08', 10, 'F', 15);
`;

const INSERT_INTO_RESEARCH_PAPERS = `
    INSERT INTO research_papers (paper_title, conference, publish_date, topic)
    VALUES 
        ('The Impact of Artificial Intelligence on the Labor Market', 'AI Conference', '2019-01-15', 'Artificial Intelligence'),
        ('Data Privacy in the Digital Age', 'Privacy Symposium', '2020-05-20', 'Privacy and Security'),
        ('Advancements in Quantum Computing', 'Quantum Computing Conference', '2021-09-10', 'Quantum Computing'),
        ('Machine Learning Applications in Healthcare', 'Healthcare Innovation Forum', '2018-11-30', 'Machine Learning'),
        ('Blockchain Technology: Beyond Cryptocurrencies', 'Blockchain Summit', '2022-03-05', 'Blockchain'),
        ('The Future of Robotics in Manufacturing', 'Robotics Expo', '2021-07-15', 'Robotics'),
        ('Big Data Analytics: Challenges and Opportunities', 'Big Data Conference', '2019-04-25', 'Big Data'),
        ('Cybersecurity Trends in a Digital World', 'Cybersecurity Symposium', '2020-08-12', 'Cybersecurity'),
        ('Renewable Energy Technologies: Innovations and Developments', 'Energy Summit', '2021-06-28', 'Renewable Energy'),
        ('Space Exploration: New Frontiers', 'Space Technology Conference', '2022-01-08', 'Space Exploration'),
        ('Artificial Intelligence and Ethics', 'Ethics Conference', '2020-10-17', 'Ethics'),
        ('The Future of Virtual Reality', 'VR Expo', '2021-03-22', 'Virtual Reality'),
        ('Advances in Biotechnology: Implications for Healthcare', 'Biotechnology Symposium', '2019-09-05', 'Biotechnology'),
        ('The Role of Data Science in Business Decision Making', 'Data Science Summit', '2020-12-18', 'Data Science'),
        ('Smart Cities: Building the Future', 'Smart City Forum', '2021-08-09', 'Smart Cities'),
        ('Augmented Reality in Education', 'Education Technology Conference', '2018-06-14', 'Augmented Reality'),
        ('Climate Change Mitigation Strategies', 'Climate Change Summit', '2022-02-20', 'Climate Change'),
        ('Emerging Trends in Nanotechnology', 'Nanotechnology Symposium', '2019-11-27', 'Nanotechnology'),
        ('Internet of Things (IoT) Applications and Challenges', 'IoT Forum', '2020-07-03', 'Internet of Things'),
        ('Digital Transformation in the Banking Industry', 'Banking Technology Summit', '2021-05-12', 'Digital Transformation'),
        ('Advancements in Materials Science', 'Materials Science Conference', '2018-10-30', 'Materials Science'),
        ('Health Informatics: Improving Healthcare Delivery', 'Health Informatics Symposium', '2022-04-14', 'Health Informatics'),
        ('The Future of Work: Remote Collaboration Technologies', 'Future of Work Conference', '2021-09-29', 'Future of Work'),
        ('Genomics and Precision Medicine', 'Genomics Summit', '2019-12-03', 'Genomics'),
        ('Social Media Analytics: Trends and Insights', 'Social Media Conference', '2020-11-08', 'Social Media'),
        ('Advances in Aerospace Engineering', 'Aerospace Technology Symposium', '2021-04-01', 'Aerospace Engineering'),
        ('Cryptocurrency Regulations: Global Perspectives', 'Regulatory Summit', '2018-07-19', 'Cryptocurrency'),
        ('Quantum Cryptography: Secure Communication in the Quantum Era', 'Cryptography Conference', '2022-06-07', 'Quantum Cryptography'),
        ('The Psychology of Happiness', 'Psychology Conference', '2011-09-25', 'Positive Psychology'),
        ('The Future of Genetic Engineering', 'Engineering Conference', '2011-02-20', 'Genetic Engineering');
`;


const INSERT_INTO_AUTHORS_RESEARCH_PAPERS = `
    INSERT INTO authors_researchPapers (paper_id, author_id)
    VALUES
        (1, 1),
        (2, 1),
        (1, 2),
        (3, 2),
        (1, 3),
        (5, 3),
        (1, 4),
        (7, 4),
        (1, 5),
        (9, 7),
        (10, 6),
        (11, 6),
        (12, 7),
        (13, 7),
        (14, 8),
        (15, 8),
        (16, 9),
        (17, 9),
        (1, 10),
        (6, 9),
        (9, 5),
        (7, 2),
        (28, 4),
        (19, 10),
        (20, 11),
        (21, 11),
        (22, 12),
        (23, 12),
        (24, 13),
        (25, 13),
        (26, 14),
        (27, 14),
        (28, 15),
        (29, 15);
`;

const EX_3_QUERIES = [

    {
        question: `Names of all authors and their corresponding mentors:`,
        query: `select a1.author_name, a2.author_name as mentor_name 
                from authors a1, authors a2 
                where a2.author_id = a1.mentor;`
    },
    {
        question: `All columns of authors and their published paper_title:`,
        query: `select a.*, paper_title
                from authors as a
                LEFT JOIN authors_researchPapers ar ON ar.author_id = a.author_id
                LEFT JOIN research_papers rp ON ar.paper_id = rp.paper_id;`
    }

];

const EX_4_QUERIES = [

    {
        question: `All research papers and the number of authors that wrote that paper:`,
        query: `SELECT paper_title, COUNT(a.author_id) AS num_authors
                FROM authors a 
                LEFT JOIN authors_researchPapers ar ON ar.author_id = a.author_id
                LEFT JOIN research_papers rp ON ar.paper_id = rp.paper_id
                GROUP BY paper_title;`
    },
    {
        question: `Sum of the research papers published by all female authors:`,
        query: `SELECT COUNT(rp.paper_title) AS total_papers_published_by_female_authors
                FROM authors a
                JOIN authors_researchPapers ar ON ar.author_id = a.author_id
                JOIN research_papers rp ON ar.paper_id = rp.paper_id
                WHERE a.gender = 'f';`
    },
    {
        question: `Average of the h-index of all authors per university:`,
        query: `SELECT university, FORMAT(AVG(h_index), 1) AS average_h_index_per_university
                FROM authors
                GROUP BY university;`
    },
    {
        question: `Sum of the research papers of the authors per university`,
        query: `SELECT university, COUNT(rp.paper_id) AS total_papers_per_university
                FROM authors a
                JOIN authors_researchPapers ar ON ar.author_id = a.author_id
                JOIN research_papers rp ON ar.paper_id = rp.paper_id
                GROUP BY a.university
                ORDER BY total_papers_per_university DESC;`
    },
    {
        question: `Minimum and maximum of the h-index of all authors per university`,
        query: `SELECT university, MAX(h_index) AS max_h_index_per_university, MIN(h_index) AS minx_h_index_per_university
                FROM authors
                GROUP BY university;`
    }

];


module.exports = {
    CREATE_RESEARCH_PAPERS_TABLE,
    CREATE_AUTHORS_RESEARCH_PAPERS_TABLE,
    disable_fk_checks,
    enable_fk_checks,
    CREATE_DATABASE,
    CREATE_AUTHORS_TABLE,
    ADD_MENTOR_COLUMN,
    INSERT_INTO_AUTHORS,
    INSERT_INTO_RESEARCH_PAPERS,
    INSERT_INTO_AUTHORS_RESEARCH_PAPERS,
    EX_3_QUERIES,
    EX_4_QUERIES
};
