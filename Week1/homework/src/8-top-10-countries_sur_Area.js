'use-strict';

const select_function = require('./select-query-function');

const sql_query = `SELECT name from  country ORDER BY surface_area DESC LIMIT 10;`;
const message = ' Top countries by their surface areas';
const column = 'name';

select_function(sql_query, message, column);