
exports.up = async (knex) => {
  return knex.schema.createTable('users', function (table) {
    table.increments();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
  })
};

exports.down = async (knex) => {
  return knex.schema.dropTableIfExists('users')
};
