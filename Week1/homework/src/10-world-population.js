'use-strict';

const select_function = require('./select-query-function');

const sql_query = ` select SUM(population) from country;`;
const message = "population of the World :";

select_function(sql_query, message, 'SUM(population)');