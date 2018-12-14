const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world'
});
//select * from (select countryCode, count(language) as sumLang from countryLanguage group by countryCode) as a where sumLang>9;
connection.connect();

function insertNewLang()
connection.end();



async function seedDatabase() {
  const CREATE_STUDENTS_TABLE = `
    CREATE TABLE IF NOT EXISTS students (
      student_number INT,
      student_name VARCHAR(50),
      date_of_birth DATE,
      grade FLOAT,
      gender ENUM('m', 'f')
    );`;
  const CREATE_TEACHERS_TABLE = `
    CREATE TABLE IF NOT EXISTS teachers (
      teacher_number INT,
      teacher_name VARCHAR(50),
      date_of_birth DATE,
      subject TEXT,
      gender ENUM('m', 'f')
    );`;
  const students = [
    {
      student_number: 4444,
      student_name: 'Benno',
      date_of_birth: '1995-04-26',
      grade: 8.3,
      gender: 'm',
    },
    {
      student_number: 3333,
      student_name: 'Henriata',
      date_of_birth: '1998-05-12',
      grade: 8.5,
      gender: 'm',
    },
  ];

  connection.connect();

  try {
    // call the function that returns promise
    await execQuery(CREATE_STUDENTS_TABLE);
    await execQuery(CREATE_TEACHERS_TABLE);
    students.forEach(async student => {
      await execQuery('INSERT INTO students SET ?', student);
    });
  } catch (error) {
    console.error(error);
  }

  connection.end();
}