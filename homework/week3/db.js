const mysql = require('mysql');

const config = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todos',
};

const connection = mysql.createConnection(config);

function executeSqlQuery(sql, inputs) {
  return new Promise((resolve, reject) => {
    connection.query(sql, inputs, (error, result) => {
      if (error) {
        reject(error);
      }

      console.log('result: ', result);
      resolve(result);
    });
  });
}
module.exports = executeSqlQuery;
