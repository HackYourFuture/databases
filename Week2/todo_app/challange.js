const mysql = require('mysql');
const config = require('./config.json');
const connection = mysql.createConnection(config);

connection.connect(function(err){
    if(err) {
        console.log('error connection' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

const input = process.argv[2];
connection.query("Select * from users where first_name = ?", input, function(error, result){
    if (result.length === 0) {
        console.log('No such user exists');
    }
    else {
        console.log(result);
    }
});
connection.end();