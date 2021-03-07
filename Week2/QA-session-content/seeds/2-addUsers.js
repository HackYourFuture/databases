const faker = require('faker');
const fetch = require("node-fetch");

const createFakeuser = () => ({
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    username: faker.internet.userName(),
    url: null
})

exports.seed = async function (knex) {
    const fakeUsers = [];

    const response = await fetch('https://api.github.com/repos/HackYourHomework/databases/pulls', {
        headers: {'Content-Type': 'application/json'}
    });
    const pullRequests = await response.json();

    let logins = [...new Set(pullRequests.map((pr) => { return pr.user.login }) )];

    await Promise.all(logins.map(async (login) => {
        const response = await fetch('https://api.github.com/users/' + login, {
            headers: {'Content-Type': 'application/json'}
        });

        const profile = await response.json();
        fakeUsers.push({
            username: profile.login,
            name: profile.name,
            url: profile.html_url,
        });
    }));

    const desiredFakeUsers = 10;
    while (fakeUsers.length < desiredFakeUsers) {
        fakeUsers.push(createFakeuser());
    }

    await knex('users').insert(fakeUsers);
};
