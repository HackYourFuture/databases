const mysql_import = require('mysql-import');

const mydb_importer = mysql_import.config({
    host     : 'localhost',
    user     : 'root',
    password : 'mosleh1234',
    database : 'new_world',
    onerror: err=>console.log(err.message)
});
mydb_importer.import('world.sql');