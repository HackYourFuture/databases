/*global console*/
"use strict";
// ##### GLOBAL VARIABLE DECLARATIONS #####
let fs = require('fs');
let options = process.argv.slice(2);
let command = options[0];
let valOfOptions = options[1];
let mysql = require('mysql');
let util = require('util');
let config = JSON.parse(fs.readFileSync("config-secret.json"))


var connection = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	port: config.port,
    database: config.database
    });

console.log(`
######||***** welcome *****||######
######|| My List Todos App ||######
`);
//This function is to read the file and catch the errorٍ
//Which we used it above To assign the variable we will use it later
function openFile(fileName) {
	try {
		var fileContaint = fs.readFileSync(__dirname + '/' + fileName, 'utf8');
	} catch(error) {
		if (error.code === 'ENOENT') {
			return console.log(fileName + ' Not exist! (or your ' + fileName + ' file)');
		} else {
			return console.log('Error: Something went wrong', error);
		}
	}
	return fileContaint;
}
// To check the type of command that will be typed by the user
switch (command) {
	case 'help':
	default:
		showHelp();
		break;
	case 'add':
		addItem();
		break;
	case 'remove':
		checkDelete();
		break;
	case 'update':
		checkUpdate();
		break;
	case 'list':
		listTodos();
		break;
}

//To call the helper text file.
function showHelp() {
	let dataOfHelp = openFile('help.txt');
	console.log(dataOfHelp);
}
//To add a new item.
function addItem(){
	let newOptions = options;
    let statusOptions=newOptions[1];
	//Make it on a single line
	let newItem = newOptions.slice(2).join(' ');
    if (statusOptions<1 ||  statusOptions>3 ){
	return console.log("Enter a number between 0 and 3 ");
    }
    if (isNaN(statusOptions) === true) {
	return console.log("Check your command  you must input a number!");
	}
    if (newItem.length<=0) {
	return console.log("There is no text for the added item, you must input text!");
	}
    connection.query(`INSERT INTO todos
            (
            Name,
            StatusId,
            Due
            )
            VALUES(
            ?,
            ?,
            ?
            )`,
                     [
        newItem,
        statusOptions,
        'NOW()'
    ],
                     function(error, results){
                        if(error){
                            console.error(error);
    
                        } else{
       
                            console.log(results);
                        }
    
    });
    connection.end();
}
//To delete the selected item.
function checkDelete() {
	//Check for the item number.
	if (isNaN(valOfOptions) === true) {
	return console.log("That is not a number, you must input a number!");
	}
    connection.query('select max(id) from todos', function (error, results, fields) {
        var glop=results[0]['max(id)'];
        if (valOfOptions > glop || valOfOptions <= 0 ) {
            connection.end();
            return console.log('\n' + '" The entered number does not exist "' + '\n');
     
        }else{
            deleteItem();
        }
    });
}
function deleteItem() {

    // remove first two items from process.argv
    let newLine = options.slice(2);

    connection.query(`DELETE FROM todos WHERE id =?`,
                     [
        valOfOptions
    ],
                     function(error, results){
                        if(error){
                            console.error(error);
    
                        } else{
       
                            console.log(results);
                        }
    });
    connection.end();
}
//To update the selected item.
function checkUpdate() {
    //Check for the item number.
    if (isNaN(valOfOptions) === true) {
        return console.log("That is not a number, you must input a number!");
    }
    if (options.slice(2).length<=0 || options.slice(2)!="1" ){
        return console.log(" you must input 1 !");
    }
    connection.query('select max(id) from todos', function (error, results, fields) {
        var glop=results[0]['max(id)'];
        if (valOfOptions > glop || valOfOptions <= 0 ) {
            connection.end();
            return console.log('\n' + '" The entered number does not exist "' + '\n');
     
        }else{
            updateItem();
        }
    });
}
 function updateItem() {
     //console.log(valOfOptions);
     // remove first two items from process.argv
     let newLine = options.slice(2);

     connection.query(`UPDATE todos SET
                Done =? 
                WHERE
                id =?`,
                      [
    
                newLine,
                valOfOptions
            ],
                      function(error, results){
                        if(error){
                            console.error(error);
    
                        } else{
       
                            console.log(results);
                        }
    
     });

     connection.end();
}
//to Displays list items
function listTodos() {
    connection.query('SELECT * FROM todos', function (error, results, fields) {
        console.log(results);
    });
    connection.end();
}
