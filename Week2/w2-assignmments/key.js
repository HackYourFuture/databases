import { createConnection } from 'mysql2/promise';

// Establish a connection to MySQL (not selecting a specific database yet)
async function main() {
    const connection = await createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',

});
  // SQL query to create the 'authors' database
const create_database_query = `CREATE DATABASE authors`;


try {
    // Create the database if it does not exist
    await connection.query(create_database_query);

    // Change the active database to 'meetup'
    await connection.changeUser({ database: 'authors' });

 // Drop the authors table if it already exists
const drop_table_authors_query = `DROP TABLE IF EXISTS authors`;
await connection.query(drop_table_authors_query);


// Create the authors table with the specified columns
const create_table_authors_query = `
    CREATE TABLE IF NOT EXISTS authors(
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(255) NOT NULL,
    university VARCHAR(255),
    date_of_birth DATE,
    h_index INT(100),
    gender VARCHAR(100)
)`;

await connection.query(create_table_authors_query);

 // Add a mentor_id column and set it as a foreign key referencing author_id
const add_column_mentor_query = `
    ALTER TABLE authors
    ADD COLUMN mentor_id INT,
    ADD CONSTRAINT fk_mentor
    FOREIGN KEY (mentor_id) REFERENCES authors(author_id)
    ON DELETE CASCADE`;


    await connection.query(add_column_mentor_query);

    console.log("Table created and foreign key added.");
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await connection.end();
  }
}

main();