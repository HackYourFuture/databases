
exports.up = async (knex) => {
  return knex.schema.createTable('users', function (table) {
    table.increments();
    table.string('name');
    table.string('username').notNullable();
    table.string('url');
  })
};

exports.down = async (knex) => {
  return knex.schema.dropTableIfExists('users')
};
