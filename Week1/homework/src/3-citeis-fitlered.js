const select_function = require('./select-query-function')

const sql_query = `SELECT name FROM city WHERE (population BETWEEN 500000 AND 1000000)`;
const message = 'cities with population in between 500,000 and 1 million'
select_function(sql_query, message);