'use-strict';

const select_function = require('./select-query-function');

const sql_query = `SELECT population FROM city WHERE name ='Rotterdam';`;
const message = "population of Rotterdam :";
const column = 'population';

select_function(sql_query, message, column)