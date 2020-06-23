const faker = require('faker');

const createTask = () => ({
  name: faker.name.jobDescriptor(),
  project_id: Math.ceil(Math.random() * 20),
  user_id: Math.ceil(Math.random() * 10),
})

exports.seed = async function(knex) {

  const fakes = [];
  const amount = 100;
  for(let i = 0; i< amount; i++){
    fakes.push(createTask());
  }

  await knex('tasks').insert(fakes);
};
