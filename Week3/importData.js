const mysql_import = require('mysql-import');

const mydb_importer = mysql_import.config({
    host     : 'localhost',
    user     : 'root',
    password : 'mosleh1234',
    database : 'todo_app',
    onerror: err=>console.log(err.message)
});
mydb_importer.import('dump-file.sql');
console.log('data imported')
