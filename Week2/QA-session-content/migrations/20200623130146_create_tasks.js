
exports.up = async (knex) => {
  return knex.schema.createTable('tasks', function (table) {
    table.increments();
    table.string('name');
    table.integer('assigned_to')
      .unsigned()
      .references('id')
      .inTable('users');
    table.integer('project_id')
      .unsigned()
      .references('id')
      .inTable('projects');
    table.integer('is_done',1).defaultTo(0);
  })
};

exports.down = async (knex) => {
  return knex.schema.dropTableIfExists('tasks')
};
