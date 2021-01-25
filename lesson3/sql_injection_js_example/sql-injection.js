var prompt = require('prompt');
var mysql      = require('mysql');
const util = require('util');


// Make sure that the DB 'company' is created with the following credentials
// Make sure that the employees table is created with employee_id as one of the columns
// Uncomment the lines followed by the comments that start with numbers
// 1, 2 and 3 to demonstrate the naive way of passing parameters and
// escaping of parameters
// Run this file with node sql-injection.js on the (VScode) terminal.

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'company',
  multipleStatements: false
});

const execQuery = util.promisify(connection.query.bind(connection))
const input = util.promisify(prompt.get.bind(this))

async function queryDatabase() {

    var input_number = ""
    prompt.start();
    try {
        const result = await input(['employee_number']);
        input_number = result.employee_number

        // 1. Naive way of passing the parameter to the query
        //const select_query = `select * from employees WHERE employee_id =  ${input_number};`

        // 2. Escaping the parameter ( replacing the unwanted characters)
        //const select_query = `select * from employees WHERE employee_id =` + connection.escape(input_number);

        // 3. Using a question mark syntax to do the escaping 
        //const select_query = `select * from employees WHERE employee_id = ?`

        connection.connect();
        console.log(select_query);
        const results = await execQuery(select_query, input_number);
        for (r of results) {
            console.log(r);
        }
    } catch(error) {
        console.error(error);
    }
    
    connection.end();
}

queryDatabase();
