import { createConnection } from 'mysql2/promise';

async function main() {
    const connection = await createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',

});

const create_database_query = `CREATE DATABASE authors`;


try {
    // Create the database if it does not exist
    await connection.query(create_database_query);

    // Change the active database to 'meetup'
    await connection.changeUser({ database: 'authors' });


const drop_table_authors_query = `DROP TABLE IF EXISTS authors`;
await connection.query(drop_table_authors_query);

const create_table_authors_query = `CREATE TABLE IF NOT EXISTS authors(
  author_id INT AUTO_INCREMENT PRIMARY KEY,
  author_name VARCHAR(255) NOT NULL,
  university VARCHAR(255),
  date_of_birth DATE,
  h_index INT(100),
  gender VARCHAR(100)
)`;

await connection.query(create_table_authors_query);

const add_column_mentor_query = `ALTER TABLE authors ADD COLUMN mentor_id INT,
ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor_id) REFERENCES authors(author_id)
    ON DELETE CASCADE`;

    await connection.query(add_column_mentor_query);

    console.log("✅ Table created and foreign key added.");
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await connection.end();
  }
}

main();