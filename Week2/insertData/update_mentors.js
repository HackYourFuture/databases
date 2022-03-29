const {
  execQuery,
  connection,
  readFile
} = require('../utils');

update_mentors();

async function update_mentors() {

  try{
    const mentors = JSON.parse(
      await readFile(__dirname+'/Data/author_mentors.json')
    );

    const promises = mentors.map(mentor => execQuery(
      'UPDATE authors SET mentor = ? WHERE author_no = ?;',[mentor['mentor'],mentor['author_no']]
    ));

    await Promise.all(promises);
    connection.end();
  }catch(err) {
    console.error(err);
    connection.end();
  }
}