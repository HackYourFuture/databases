const select_function = require('./select-query-function')

const sql_queryLand = `SELECT name FROM country WHERE name like '%land%';`;
const messageLand = 'countries that have "land" in their names'
select_function(sql_queryLand, messageLand);