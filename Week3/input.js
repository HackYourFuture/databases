const prompt = require('prompt');
const mysql = require('mysql');
const util = require("util");


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'class17'
});

function printResult(results) {
  if (!results[0]) {
    console.log(results);
  } else {
    for (let i in results) {
      console.log(results[i]);
    }
  }
}

function onErr(err) {
  console.log(err);
  return 1;
}

prompt.start();

const input = new Promise((resolve, reject) => {
  prompt.get(["number"], (err, result) => {
    if (err) { reject(err); }
    // console.log("Command-line input received:");
    resolve(result.number);
  })
});
// students WHERE student_nember
input.then((resolve) => {
  // resolve 
  connection.connect();
  const query = "SELECT * FROM departments WHERE did = ?";
  connection.query(query, resolve, (err, results, fields) => {
    if (err) {
      onErr(err);
    }
    printResult(results);
    connection.end();
  });
}).catch((err) => onErr(err));






