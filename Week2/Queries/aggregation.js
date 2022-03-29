const {
  execQuery,
  connection
} = require('../utils');

executeQueries();

async function executeQueries() {

  try{

    /* Query 1 */
    const rows1 = await execQuery('select papers.paper_title,\
    count(author_papers.paper_id) as no_of_authors from\
    research_papers papers join\
    author_papers on  papers.paper_id = author_papers.paper_id\
    GROUP BY author_papers.paper_id;')

    /* Query 2 */
    const rows2 = await execQuery('select count(author_papers.paper_id) as sum_of_papers\
    from authors join author_papers\
    on authors.author_no = author_papers.author_no where authors.gender = \'female\';')

    /* Query 3 */
    const rows3 = await execQuery('select university, avg(h_index) as h_index_avg\
    from authors group by university;')

    /* Query 4 */
    const rows4 = await execQuery('select authors.university as university,\
    count(author_papers.paper_id) as sum_of_papers\
    from authors join author_papers\
    using(author_no) group by university;')

    /* Query 5 */
    const rows5 = await execQuery('select university, max(h_index) as h_index_max,\
    min(h_index) as h_index_min from authors group by university;')

    rows1.forEach(row => {
      console.log(row['paper_title'],'      ',row['no_of_authors']+'\n');
    });

    console.log('----------------------------------------------');

    rows2.forEach(row => {
      console.log(row['sum_of_papers']+'\n');
    });

    console.log('----------------------------------------------');

    rows3.forEach(row => {
      console.log(row['university'] + '       ' + row['h_index_avg']+'\n');
    });

    console.log('----------------------------------------------');

    rows4.forEach(row => {
      console.log(row['university'] + '       ' + row['sum_of_papers']+'\n');
    });

    console.log('----------------------------------------------');

    rows5.forEach(row => {
      console.log(row['university'] + '       ' + row['h_index_max'] + '        ' + row['h_index_min']+'\n')
    });

    connection.end();
  }catch(err) {
    console.error(err.message);
    connection.end();
  }
}