//C:\Users\knowl\Documents\hyf\databases\Week2\exercise_2.js
import {createNewConnection, useDatabase} from './connection_query.js';


const createResearchPapersTable = async (connection)  => {
    const createResearchPapersTableQuery = `
        CREATE TABLE IF NOT EXISTS research_papers (
            paper_id INT AUTO_INCREMENT PRIMARY KEY,
            paper_title VARCHAR(255) NOT NULL,
            conference VARCHAR(255),
            publish_date DATE
        );
    `;
    await new Promise((resolve, reject) => {
        connection.query(createResearchPapersTableQuery, (err, results) => {
            if (err) {
                console.error('Error creating research_papers table:', err.stack);
                reject(err);
                return;
            }
            console.log('Research papers table created.');
            resolve();
        });
    });
};

const createAuthorPapersTable = async (connection)  => {
    const createAuthorPapersTableQuery = `
        CREATE TABLE IF NOT EXISTS author_papers (
            author_id INT,
            paper_id INT,
            PRIMARY KEY (author_id, paper_id),
            FOREIGN KEY (author_id) REFERENCES authors(author_id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
            FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
        );
    `;
    await new Promise((resolve, reject) => {
        connection.query(createAuthorPapersTableQuery, (err, results) => {
            if (err) {
                console.error('Error creating author_papers table:', err.stack);
                reject(err);
                return;
            }
            console.log('Author papers table created.');
            resolve();
        });
    });
};


const authors = [
    ['Alan Turing', 'University of Cambridge', '1912-06-23', 67, 'Male', null],
    ['Ada Lovelace', 'University of London', '1815-12-10', 45, 'Female', null],
    ['John von Neumann', 'Princeton University', '1903-12-28', 86, 'Male', null],
    ['Grace Hopper', 'Yale University', '1906-12-09', 60, 'Female', 1],
    ['Donald Knuth', 'Stanford University', '1938-01-10', 127, 'Male', 3],
    ['Edsger Dijkstra', 'University of Texas', '1930-05-11', 87, 'Male', null],
    ['Tim Berners-Lee', 'MIT', '1955-06-08', 70, 'Male', 4],
    ['Claude Shannon', 'MIT', '1916-04-30', 80, 'Male', null],
    ['Barbara Liskov', 'MIT', '1939-11-07', 85, 'Female', null],
    ['John McCarthy', 'Stanford University', '1927-09-04', 75, 'Male', 3],
    ['Marvin Minsky', 'MIT', '1927-08-09', 76, 'Male', 9],
    ['Larry Page', 'Stanford University', '1973-03-26', 64, 'Male', 12],
    ['Sergey Brin', 'Stanford University', '1973-08-21', 63, 'Male', 11],
    ['Don Norman', 'UC San Diego', '1935-12-25', 55, 'Male', null],
    ['Brenda Laurel', 'UC Santa Cruz', '1950-11-20', 40, 'Female', 13]
];


const papers = [
    ['On Computable Numbers, with an Application to the Entscheidungsproblem', 'Proceedings of the London Mathematical Society', '1936-11-12'],
    ['The Analytical Engine', 'University of London', '1842-01-01'],
    ['Theory of Games and Economic Behavior', 'Princeton University Press', '1944-03-01'],
    ['The First Compiler', 'Harvard University', '1952-01-01'],
    ['The Art of Computer Programming', 'Addison-Wesley', '1968-01-01'],
    ['A Note on Two Problems in Connexion with Graphs', 'Numerische Mathematik', '1959-01-01'],
    ['Information Management: A Proposal', 'CERN', '1989-03-01'],
    ['A Mathematical Theory of Communication', 'Bell System Technical Journal', '1948-07-01'],
    ['A Design Methodology for Reliable Software Systems', 'MIT', '1972-01-01'],
    ['LISP: A Programming Language for Artificial Intelligence', 'Communications of the ACM', '1960-01-01'],
    ['Steps Toward Artificial Intelligence', 'Proceedings of the IRE', '1961-01-01'],
    ['The PageRank Citation Ranking: Bringing Order to the Web', 'Stanford University', '1998-01-01'],
    ['The Anatomy of a Large-Scale Hypertextual Web Search Engine', 'Stanford University', '1999-01-01'],
    ['The Design of Everyday Things', 'Basic Books', '1988-01-01'],
    ['Computers as Theatre', 'Addison-Wesley', '1991-01-01'],
    ['Quantum Mechanics and Path Integrals', 'Dover Publications', '1965-01-01'],
    ['Reflections on Trusting Trust', 'Communications of the ACM', '1984-01-01'],
    ['The Complexity of Theorem-Proving Procedures', 'ACM Symposium on Theory of Computing', '1971-01-01'],
    ['Sketchpad: A Man-Machine Graphical Communication System', 'Spring Joint Computer Conference', '1963-01-01'],
    ['No Silver Bullet: Essence and Accidents of Software Engineering', 'IFIP Congress', '1986-01-01'],
    ['Introduction to Automata Theory, Languages, and Computation', 'Addison-Wesley', '1979-01-01'],
    ['The Conceptual Framework of Computing', 'MIT', '1973-01-01'],
    ['Design Patterns: Elements of Reusable Object-Oriented Software', 'Addison-Wesley', '1994-01-01'],
    ['Computing Machinery and Intelligence', 'Mind', '1950-01-01'],
    ['The CRISP-DM Process Model', 'IBM Research', '1999-01-01'],
    ['As We May Think', 'The Atlantic', '1945-01-01'],
    ['The Feynman Lectures on Physics', 'Addison-Wesley', '1964-01-01'],
    ['The Mathematical Theory of Computation', 'Prentice Hall', '1972-01-01'],
    ['The Structure of Scientific Revolutions', 'University of Chicago Press', '1962-01-01'],
    ['Patterns of Software: Tales from the Software Community', 'Oxford University Press', '1996-01-01']
];

const authorPapers = [
    [1, 1], [2, 2], [3, 3], [4, 4], [5, 5],
    [6, 6], [7, 7], [8, 8], [9, 9], [10, 10],
    [11, 11], [12, 12], [13, 13], [14, 14], [15, 15],
    [1, 16], [2, 17], [3, 18], [4, 19], [5, 20],
    [6, 21], [7, 22], [8, 23], [9, 24], [10, 25],
    [11, 26], [12, 27], [13, 28], [14, 29], [15, 30]
];

const insertAuthors = async (connection)  => {
    const insertAuthorQuery = `
        INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor)
        VALUES ?
    `;
    await new Promise((resolve, reject) => {
        connection.query(insertAuthorQuery, [authors], (err, results) => {
            if (err) {
                console.error('Error inserting authors:', err.stack);
                reject(err);
                return;
            }
            console.log('Authors inserted.');
            resolve();
        });
    });
};

const insertResearchPapers = async (connection)  => {
    const insertPaperQuery = `
        INSERT INTO research_papers (paper_title, conference, publish_date)
        VALUES ?
    `;
    await new Promise((resolve, reject) => {
        connection.query(insertPaperQuery, [papers], (err, results) => {
            if (err) {
                console.error('Error inserting research papers:', err.stack);
                reject(err);
                return;
            }
            console.log('Research papers inserted.');
            resolve();
        });
    });
};

// Insert data into author_papers junction table
const linkAuthorsToPapers = async (connection)  => {
    const insertAuthorPapersQuery = `
        INSERT INTO author_papers (author_id, paper_id)
        VALUES ?
    `;
    await new Promise((resolve, reject) => {
        connection.query(insertAuthorPapersQuery, [authorPapers], (err, results) => {
            if (err) {
                console.error('Error inserting author_papers:', err.stack);
                reject(err);
                return;
            }
            console.log('Author papers relationships inserted.');
            resolve();
        });
    });
};



const exerciseTwo = async () => {

    const connection = createNewConnection();

        connection.connect(err => {
            if (err) {
                return console.error('Connection error: ' + err.stack);
            }
            console.log('exercise_2: Connected!');
        });

    try {
        await useDatabase(connection) ;           // Ensure the database is selected
        await createResearchPapersTable(connection) ;  // Create the research_papers table
        await createAuthorPapersTable(connection) ;    // Create the author_papers table
        await insertAuthors(connection) ;             // Insert authors into the authors table
        await insertResearchPapers(connection) ;      // Insert research papers
        await linkAuthorsToPapers(connection) ;        // Insert author-paper relationships

        console.log('Exercise steps completed.');
    } catch (err) {
        console.error('Failed to set up the database:', err);
    } finally {
            connection.end();
    };
    };



exerciseTwo();