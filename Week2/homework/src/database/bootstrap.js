const { connection } = require('./connection');
const { createTables } = require('./create-tables');
const { seedTables } = require('./seed-tables');

const DB_NAME = 'new_world';

(async function() {
  try {
    connection.connect();
    console.log('Connected!');

    // Invoking functions for creating database and tables
    await createTables(DB_NAME);

    // Invoking functions for seeding tables
    await seedTables();

    connection.end();
  } catch (error) {
    console.log(error);
  }
})();
