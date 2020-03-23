var prompt = require('prompt');
var mysql      = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'company',
  multipleStatements: true
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
        const select_query = `select * from employees WHERE employee_id =  ${input_number};`

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
