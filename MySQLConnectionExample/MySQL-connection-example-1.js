var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'todos'
});

connection.connect();
connection.query('SELECT * from todos', function(err, rows, fields) {
  if (!err) {
    console.log('Rows: ', rows);
    console.log('Fields: ', fields);
  /*
    for (var i = 0; i < rows.length; i++) {
      console.log('Id: ', rows[i]['Id']);
      console.log('Name: ', rows[i]['Name']);
      console.log('Done: ', rows[i]['Done']);
    }
  */
  }
  else {
    console.log('Error while performing Query.');
  }
});
connection.end();
