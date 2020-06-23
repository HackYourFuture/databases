
exports.up = async (knex) => {
  return knex.schema.createTable('projects', function (table) {
    table.increments();
    table.string('name').notNullable();
    table.date('start_date');
    table.date('end_date');
    table.string('code').unique();
    table.timestamps();
  })
};

exports.down = async (knex) => {
  return knex.schema.dropTableIfExists('projects')
};
