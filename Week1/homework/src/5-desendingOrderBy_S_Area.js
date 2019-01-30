const select_function = require('./select-query-function')

const sql_queryLand = `SELECT name FROM country ORDER BY surface_area DESC;`;
const messageLand = ' countries in the descending order of their surface areas'
select_function(sql_queryLand, messageLand);