const {execQuery, connection} = require('./utils');

const create_research_papers_table = 'create table if not exists research_papers (\
	paper_id int not null auto_increment,\
    paper_title varchar(200) not null,\
    conference varchar(200),\
    publish_date varchar (50) not null,\
    primary key (paper_id)\
);';

const create_author_papers_table = 'create table if not exists author_papers (\
	  paper_id int not null,\
    author_no int not null,\
    primary key (paper_id, author_no),\
    foreign key (paper_id) references research_papers(paper_id),\
    foreign key (author_no) references authors(author_no)\
);';

executeQueries();

async function executeQueries() {

  try {
    await execQuery(create_research_papers_table);
    console.log('Table research_papers created successfully!');
    await execQuery(create_author_papers_table);
    console.log('Table author_papers created successfully!');

    connection.end();
  } catch(err) {
    console.error(err);
    connection.end();
  }
}