const faker = require('faker');

const createRelation = (i) => ({
  // user 2 to 9 will have projects
  user_id: 1 + Math.ceil(Math.random() * 8),
  // project 4 to 18 will have projects
  project_id: 3 + Math.ceil(Math.random() * 15),
  project_alias: (i%5 ? null : faker.random.word())
})

exports.seed = async function (knex) {

  const fakes = [];
  const amount = 30;
  for (let i = 0; i < amount; i++) {
    fakes.push(createRelation(i));
  }

  await knex('project_users').insert(fakes);
};
