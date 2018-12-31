var prompt = require('prompt');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'class17'
});

prompt.start();


prompt.get(['number'], function (err, result) {

  if (err) { return onErr(err); }

  console.log('Command-line input received:');

  console.log('  Number: ' + result.number);
});


function onErr(err) {
  console.log(err);
  return 1;
}

connection.connect();

var select_query = 'select * from students where studet_number = ' + input_number;
console.log('Going To run', select_query);
connection.query(select_query, function (error, results, fields) {
  if (error) { throw error; }
  for (i in results) {
    console.log(results);
  }
}
);
connection.end();
