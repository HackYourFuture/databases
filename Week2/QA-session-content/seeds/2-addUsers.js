const faker = require('faker');

const createFakeuser = () => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName()
})

exports.seed = async function(knex, Promise) {

  const fakeUsers = [];
  const desiredFakeUsers = 10;
  for(let i = 0; i< desiredFakeUsers; i++){
    fakeUsers.push(createFakeuser());
  }

  await knex('users').insert(fakeUsers);
};
