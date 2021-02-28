const faker = require('faker');

const createTask = (i) => ({
  name: faker.hacker.verb() + ' '+ faker.hacker.adjective() + ' '+ faker.hacker.noun(),
  project_id: Math.ceil(Math.random() * 20),
  assigned_to: (i % 3 ? null : Math.ceil(Math.random() * 10)),
  done_at: (i % 4 ? faker.date.past() : null)
})

exports.seed = async function (knex) {

  const fakes = [];
  const amount = 100;
  for (let i = 0; i < amount; i++) {
    fakes.push(createTask(i));
  }

  await knex('tasks').insert(fakes);
};
