// Knex is a full featured SQL query builder with async workflow and chaining methods
// For more info and documentation
// http://knexjs.org/
const knex = require('knex')({
  client: 'mysql',
  connection: 'mysql://todo:todo@192.168.153.132/todo',
});

module.exports = knex;
