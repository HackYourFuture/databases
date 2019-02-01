'use-strict';

const select_function = require('./select-query-function')

const sql_query = `SELECT name FROM  city ORDER BY population DESC LIMIT 10;`;
const message = ' most populated cities.';
const column = 'name';

select_function(sql_query, message, column);