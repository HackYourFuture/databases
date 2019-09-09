var prompt = require('prompt');
var mysql      = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'zoo',
  multipleStatements: false
});

const execQuery = util.promisify(connection.query.bind(connection))
const input = util.promisify(prompt.get.bind(this))

async function queryDatabase() {

    var input_number = ""
    prompt.start();
    try {
        const result = await input(['number']);
        input_number = result.number

        // 1. Naive way of passing the parameter to the query
        //const select_query = `select * from students WHERE student_number =  ${input_number};`
        //const select_query = `select * from employees WHERE emp_no =  ${input_number};`

        // 2. Escaping the parameter ( replacing the unwanted characters)
        //const select_query = `select * from students WHERE student_number =` + connection.escape(input_number);
        //const select_query = `select * from animal WHERE gender =` + connection.escape(input_number);

        // 3. Using a question mark syntax to do the escaping (AKA prepared statements)
        //const select_query = `select * from students WHERE student_number = ?`
        //const select_query = `select * from employee WHERE eno = ?`
        const select_query = `select * from animal WHERE gender = ?`;

        connection.connect();
        console.log(select_query);
        var results = await execQuery(select_query, input_number);
    } catch(error) {
        console.error(error);
    }
    
    for (r of results) {
        console.log(r);
    }
    connection.end();
}

queryDatabase();
