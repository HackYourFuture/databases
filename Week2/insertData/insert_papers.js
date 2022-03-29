const {
  execQuery,
  connection,
  readFile
} = require('../utils');

insert_papers();

async function insert_papers() {

  try {
    const papers = JSON.parse(
      await readFile(__dirname+'/Data/papers.json')
    );

    const promises = papers.map(paper => {
      execQuery('INSERT INTO research_papers SET ?', paper);
    });

    await Promise.all(promises);
    connection.end();
  } catch(err) {
    console.error(err);
    connection.end();
  }
}

/*
readFile(__dirname+'/papers.json')
  .then(data => JSON.parse(data))
  .then(papers => {
    const promises = papers.map(paper => {
      return execQuery(con, 'INSERT INTO research_papers SET ?', paper)
    });
    return Promise.all(promises);
  })
  .then(() => con.end())
  .catch(err => {
    console.error(err.message);
    con.end();
  });

function execQuery(con, sql, args=[]) {
  return new Promise((resolve, reject) => {
    con.query(sql, args, (err, rows) => {
      if(err) reject(err);
      else resolve(rows);
    });
  });
}

function readFile(path, encoding='utf8') {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, (err, data) => {
      if(err) reject(err);
      else resolve(data);
    });
  });
}
*/