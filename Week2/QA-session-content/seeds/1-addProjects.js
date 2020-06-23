const faker = require('faker');

const createProject = () => ({
  name: faker.name.jobTitle(),
})

exports.seed = async function(knex) {

  const fakes = [];
  const amount = 20;
  for(let i = 0; i< amount; i++){
    fakes.push(createProject());
  }

  await knex('projects').insert(fakes);
};
