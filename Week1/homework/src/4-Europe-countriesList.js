'use-strict';

const select_function = require('./select-query-function');

const sql_queryLand = `SELECT name FROM country WHERE continent = 'Europe';`;
const messageLand = ' countries in the continent ‘Europe’ ';
const column = 'name';

select_function(sql_queryLand, messageLand, column);