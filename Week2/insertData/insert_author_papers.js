const {
  readFile,
  connection,
  execQuery
} = require('../utils');

/*
  Promisification is the conversion of a function that accpets a callback
  to a function that returns a promise.
*/

seed_author_papers_tbl();

async function seed_author_papers_tbl() {
  try {

    const data = await readFile(__dirname+'/Data/author_papers.json');
    const author_papers = JSON.parse(data);

    const promises = author_papers.map(obj => execQuery('INSERT INTO author_papers SET ?', obj));
    await Promise.all(promises);
    connection.end();
  } catch(err) {
    console.error(err.message);
    connection.end();
  }
}