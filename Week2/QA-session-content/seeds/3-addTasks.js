const faker = require('faker');

const createTask = (i) => ({
  name: faker.random.words(),
  project_id: Math.ceil(Math.random() * 20),
  assigned_to: (i % 3 ? null : Math.ceil(Math.random() * 10)),
  is_done: (i % 4 ? 1 : 0)
})

exports.seed = async function (knex) {

  const fakes = [];
  const amount = 100;
  for (let i = 0; i < amount; i++) {
    fakes.push(createTask(i));
  }

  await knex('tasks').insert(fakes);
};
