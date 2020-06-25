exports.seed = async (knex) => {

  await knex.raw('SET foreign_key_checks = 0;');
  await knex('project_users').truncate();
  await knex('tasks').truncate();
  await knex('projects').truncate();
  await knex('users').truncate();
  await knex.raw('SET foreign_key_checks = 1;');

};
