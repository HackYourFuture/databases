const {execQuery, connection} = require('./utils');

// Drop all tables in research_gate database
reset();

// reset function using util.promisify
async function reset() {
  try{
    await execQuery('DROP TABLE IF EXISTS author_papers;');
    console.log('Table author_papers dropped successfully!');
    await execQuery('DROP TABLE IF EXISTS research_papers;');
    console.log('Table research_papers dropped successfully');
    await execQuery('DROP TABLE IF EXISTS authors;');
    console.log('Table authors dropped successfully!');
    connection.end();
  } catch(err) {
    console.error(err);
    connection.end();
  }

}

/* callback version

function reset(connection) {
  connection.query('DROP TABLE IF EXISTS author_papers;', err => {
    if (err) {
      exitWithError(connection, err);
    }
    console.log('Table author_papers dropped successfully');
    connection.query('DROP TABLE IF EXISTS research_papers;', err => {
      if (err) {
        exitWithError(connection, err);
      }
      console.log('Table research_papers dropped successfully');
      connection.query('DROP TABLE IF EXISTS authors;', err => {
        if (err) {
          exitWithError(connection,err);
        }
        console.log('Table authors dropped successfully');
        connection.end();
        process.exit(0);
      });
    });
  });
}
*/