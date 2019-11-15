const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'todo_api',
});

function selectQuery(query, query2) {
  return new Promise((resolve, reject) => {
    connection.query(query, query2, function(error, results, fields) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function insertQuery(query, query2) {
  return new Promise((resolve, reject) => {
    connection.query(query, query2, function(error, results, fields) {
      if (error) {
        reject(error);
      } else {
        resolve(results.insertId);
      }
    });
  });
}

function deleteQuery(query, query2) {
  return new Promise((resolve, reject) => {
    connection.query(query, query2, function(error, results, fields) {
      if (error) {
        reject(error);
      } else {
        resolve(results.affectedRows);
      }
    });
  });
}

const db = {
  selectQuery,
  insertQuery,
  deleteQuery,
  updateQuery: deleteQuery,
};
module.exports = db;
