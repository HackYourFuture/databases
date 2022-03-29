const {
  execQuery,
  connection
} = require('../utils');

executeQueries();

async function executeQueries() {
  try {
    const rows1 = await execQuery('select a.author_name as author, m.author_name as mentor from authors a join authors m on a.mentor = m.author_no;')
    const rows2 = await execQuery('select authors.*, research_papers.paper_title \
    from authors \
    left join author_papers on authors.author_no = author_papers.author_no \
    left join research_papers on author_papers.paper_id = research_papers.paper_id')
    console.log('author     mentor\n');
    rows1.forEach(row => {
      console.log(row['author'] +"    "+row['mentor']+'\n');
    });

    console.log('author_name      paper_title\n');

    rows2.forEach(rows2 => {
      console.log(rows2['author_name']+'      '+rows2['paper_title']+'\n');
    });

    connection.end();

  } catch(err) {
    console.error(err.message);
    connection.end();
  }
}
