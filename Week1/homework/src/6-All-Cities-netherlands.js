const select_function = require('./select-query-function')

const sql_query = `SELECT name from city where country ='Netherlands';`;
const message = 'cities in the Netherlands'
select_function(sql_query, message);