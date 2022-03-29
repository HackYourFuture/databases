const {execQuery, connection} = require('./utils');

const create_authors = 'create table if not exists authors ( \
	author_no int NOT NULL auto_increment,\
    author_name varchar(50) not null,\
    university varchar(50) not null,\
    date_of_birth DATE,\
    h_index double(5,1) not null default 0.0,\
    gender enum(\'male\', \'female\') not null,\
    primary key (author_no)\
)';

const add_mentor = 'ALTER TABLE authors ADD COLUMN mentor int;'
const add_fk_constraint = 'ALTER TABLE authors ADD CONSTRAINT FK_author foreign key (mentor) \
  references authors(author_no);';

create_tables_and_constraints();

async function create_tables_and_constraints() {

  try {

    await execQuery(create_authors);
    console.log('Table authors created successfully!');
    await execQuery(add_mentor);
    console.log('Column mentor added successfully!');
    await execQuery(add_fk_constraint);
    console.log('Foreign key constraint added successfully!');

    connection.end();
  } catch(err) {
    console.error(err);
    connection.end();
  }
}