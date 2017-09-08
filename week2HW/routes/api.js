var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var router = express.Router({ caseSensitive: true });
var fs = require('fs');
var mysql = require('mysql');
var config = JSON.parse(fs.readFileSync('config-secret.json'));
//const connection =  mysql.connect('mssql://hameed:BerlinSkater20@localhost/hameed')
var connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.port,
    database: config.database
});

router.delete('/todo/:id', function(request, response) {
const escId = mysql.escape(request.params.id);
 //console.log(mysql.escape('%'))
connection.query(
      `DELETE FROM 
             todos
        WHERE
                    id = ${escId}`
                , function (error, results, fields) {
    return response.status(201).send({
                message: 'Successfully created a Todo',
            })
    });

});
router.put('/todo/:id', function(request, response) {
    console.log(request.body)
const escId = mysql.escape(request.params.id);

connection.query(
      `UPDATE  
             todos
        SET Done = ${request.body.done}
        WHERE
                    id = ${escId}`
                , function (error, results, fields) {
    return response.status(201).send({
                message: 'Successfully updated a Todo',
            })
    });

});
router.get('/allTodos', function(request, response) {
    connection.query(
        `select todos.Id, todos.Name, todos.Done, statuses.Name as statuses from todos 
left join statuses
on todos.StatusId = statuses.Id`,
         function (error, results, fields) {
    return response.status(200).json(results)
    });
});

router.post('/add', function(request, response) {
    console.log(request.body)
const escName = mysql.escape(request.body.name);

           
  connection.query(
      `INSERT INTO
        todos
                    (
                    Done,
                    Name,
                    StatusId,
                    Due
                    )
        VALUES(
                0,
                ${escName},
                1,
                NOW()
                )`
                , function (error, results, fields) {
    return response.status(201).send({
                message: 'Successfully created a Todo',
            })
    });

});
module.exports = router;
