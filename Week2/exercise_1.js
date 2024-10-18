//C:\Users\knowl\Documents\hyf\databases\Week2\exercise_1.js
import {createNewConnection, useDatabase} from './connection_query.js';


const createAuthorsTable = (connection)  => {
    return new Promise((resolve, reject) => {
        const createAuthorsTableQuery = `
            CREATE TABLE IF NOT EXISTS authors (
                author_id INT AUTO_INCREMENT PRIMARY KEY,
                author_name VARCHAR(100) NOT NULL,
                university VARCHAR(100),
                date_of_birth DATE,
                h_index INT,
                gender ENUM('Male', 'Female', 'Other')
            );
        `;
        connection.query(createAuthorsTableQuery, (err, results) => {
            if (err) {
                console.error('Error creating authors table:', err.stack);
                reject(err);
                return;
            }
            console.log('Authors table created.');
            resolve();
        });
    });
};

const addMentorColumn = (connection)  => {
    return new Promise((resolve, reject) => {
        const checkColumnExistsQuery = `
            SELECT COUNT(*) AS columnExists
            FROM information_schema.columns
            WHERE table_name = 'authors'
              AND column_name = 'mentor';
        `;

        connection.query(checkColumnExistsQuery, (err, results) => {
            if (err) {
                console.error('Error checking for mentor column:', err.stack);
                reject(err);
                return;
            }

            const columnExists = results[0].columnExists;

            if (columnExists) {
                console.log('Mentor column already exists. No changes made.');
                resolve();
            } else {
                const addMentorColumnQuery = `
                    ALTER TABLE authors 
                    ADD COLUMN mentor INT,
                    ADD CONSTRAINT fk_mentor
                    FOREIGN KEY (mentor) REFERENCES authors(author_id)
                    ON DELETE SET NULL
                    ON UPDATE CASCADE;
                `;

                connection.query(addMentorColumnQuery, (err, results) => {
                    if (err) {
                        console.error('Error adding mentor column:', err.stack);
                        reject(err);
                        return;
                    }
                    console.log('Mentor column added with foreign key constraint.');
                    resolve();
                });
            }
        });
    });
};


const exerciseOne = async () => {
    const connection = createNewConnection();
        connection.connect(err => {
            if (err) {
                return console.error('Connection error: ' + err.stack);
            }
            console.log('exercise_1: Connected!');
        });


    try {
        await useDatabase(connection) ;           // Select the database
        await createAuthorsTable(connection) ;    // Create the authors table
        await addMentorColumn(connection) ;       // Add the mentor column with foreign key

    } catch (err) {
        console.error('Failed to set up the database:', err);
    } finally {
        connection.end();
    }
};


exerciseOne();

