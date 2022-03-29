const {
  readFile,
  execQuery,
  connection
} = require('../utils');

insertData();

async function insertData() {
  try {
    data = await readFile(__dirname + '/Data/authors.json');
    authors = JSON.parse(data);

    const promises = authors.map(author => {
      execQuery('INSERT INTO authors SET ?', author);
    });
    await Promise.all(promises);
    connection.end();

  }catch(err){
    console.error(err);
    connection.end();
  }
}

// read data from the working directory
/*
fs.readFile(__dirname+'/Data/authors.json','utf8', (err, data) => {
  if (err) {
    exitWithError(err, connection);
  }
  const authors = JSON.parse(data);

  // insert data into authors table
  count = authors.length;
  authors.forEach(author => {
    connection.query('INSERT INTO authors SET ?',author, err => {
      if (err) {
        exitWithError(err, connection);
      }
    });
    count--;
    if(count == 0) {
      connection.end();
    }
  });
});
*/