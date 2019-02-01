'use-strict';

const select_function = require('./select-query-function');

const sql_query = `SELECT name FROM country where population > 8;`;
const message = 'Countries with population more than 8 million.';
const column = 'name';

select_function(sql_query, message, column);