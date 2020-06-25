
exports.up = async (knex) => {
  return knex.schema.createTable('project_users', function (table) {
    table.integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users');
    table.integer('project_id')
      .unsigned()
      .references('id')
      .inTable('projects');
    table.string('project_alias').nullable();
  })
};

exports.down = async (knex) => {
  return knex.schema.dropTableIfExists('project_users')
};
