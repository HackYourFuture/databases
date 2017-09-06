var fs = require('fs');
var mysql = require('mysql');
var prompt = require('prompt');

var config = JSON.parse(fs.readFileSync('config-secret.json'));

var connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.port,
    database: config.database
});

const option = process.argv.slice(2);

switch (option[0]){
    case 'list':
        listData();
        break;
    case 'add':
        addNewEntry();
        break;
    case 'update':
        updateData();
        break;
    case 'delete':
        DeleteData();
        break;
    default:
        console.log(`Please use 'list' 'add' 'update' 'delete' to edit DataBase`);
         break;                       
    
};

function listData(){
    var query = 'SELECT * FROM todos';
    sendQuery(query);
}

function addNewEntry(){
    console.log (`\nEnter new todo item and the date, to enter curent date and time just enter "now"\n`)
    prompt.start();
    prompt.get(['Name', 'Due'], (err, res) => {
        if (err){
            console.log(err);
        } else {
            
            var escName = mysql.escape(res.Name);
            var escDue = mysql.escape(res.Due);
            if (escDue == "'Now'"|| escDue == "'now'"){
                escDue = "NOW()";
            }
            const query = `INSERT INTO
                            todos
                            (
                                Name,
                                Due
                            )
                            VALUES(
                                ${escName},
                                ${escDue}
                            )`;
            console.log(query);                
            sendQuery(query);
        }
    });
    
}

function updateData(){ 
    console.log(`\n Enter the row ID then enter colume name "Done", "Name", "StatusId", "Due" 
    then enter new value.                 0-1    value     1-2-3     YYYY-MM-DD HH:MM:SS. \n`);
    prompt.start();
    prompt.get(['ID', 'Colume_name', 'New_value'], (err, res) => {
        if(err) {
            throw err
        } else {
            var escId = mysql.escape(res.ID);
            var escColName = mysql.escape(res.Colume_name);
            var escNewValue = mysql.escape(res.New_value);
            const query = `UPDATE
                                todos
                            SET
                                ${res.Colume_name} = ${escNewValue}
                            WHERE
                                id = ${escId} `;
            sendQuery(query);
        }
    });
}

function DeleteData(){
    console.log(`\nEnter row Id number to delete \n`);
    prompt.start();
    prompt.get(['ID'],(err, res) => {
        if (err){
            throw err;
        } else {
            var escId = mysql.escape(res.ID);
            const query = `DELETE FROM 
                                todos
                            WHERE
                                id = ${escId}`;
            sendQuery(query);
        }
    })
}

function sendQuery(queryData){
    connection.connect;
    connection.query(
        queryData,
        (err, result) => {
            if(err){
                console.log(err);
            } else {
                console.log(result);
            }
        }
    )
    connection.end();
}