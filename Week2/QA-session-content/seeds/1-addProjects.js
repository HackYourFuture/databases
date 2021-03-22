const faker = require('faker');

const createProject = function (i) {
  let companyName = faker.company.companyName();
  let abbreviation = companyName
    .replace(/,|and|-/gi, '')
    .split(' ')
    .map((name) => name[0])
    .join('');

  return {
    name: companyName + ' - ' + (i % 2 ? 'website' : 'app'),
    start_date: faker.date.past(),
    end_date: (i % 5 ? faker.date.future() : faker.date.past()),
    code: abbreviation
  }
}

exports.seed = async function (knex) {

  const fakes = [];
  const codes = [];
  const amount = 20;
  for (let i = 0; i < amount; i++) {
    let project = createProject(i);
    if(codes.includes(project.code)){
      project.code += i;
    }
    codes.push(project.code);
    fakes.push(project);
  }

  await knex('projects').insert(fakes);
};
