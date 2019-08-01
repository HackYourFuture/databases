'use strict';

function handleError(error) {
  if (error.code === 'ER_BAD_DB_ERROR') {
    return console.error('Database is not found. Please create it by typing "YES".');
  }
  if (error.code === 'ECONNREFUSED') {
    return console.error('Server is offline. Please start mySQL server and restart this program.');
  }
  if (error.code === 'ENOENT') {
    return console.error('File is not found. Make sure the path to file is correct and try again.');
  }
  if (error.code === 'ER_NO_SUCH_TABLE') {
    return console.error('Table is not found in database. Restart and try creating again.');
  }
  return console.error(error.message);
}

module.exports = handleError;
