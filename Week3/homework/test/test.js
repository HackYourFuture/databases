'use strict';

const faker = require('faker');
const pool = require('../database/connection').pool;

// const a = async () => {
//   for (let i = 0; i < 10; i++) {
//     const userName = faker.internet.userName(); // Rowan Nikolaus
//     const userEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
//     const userPass = faker.internet.password(); // Rowan Nikolaus
//     const userSql = `INSERT INTO user (name, email, password) VALUES ('${userName}','${userEmail}','${userPass}')`;
//     await pool.query(userSql);
//   }
// };
// a();

const b = async () => {
  for (let i = 0; i < 50; i++) {
    // const userId = faker.random.number({ min: 2, max: 11 });
    // const listname = faker.random.arrayElement([
    //   'My work',
    //   'Home',
    //   'Saturday night',
    //   'Children',
    //   'Shopping',
    //   'Party',
    //   'Homework',
    //   'Front end',
    //   'My SQL',
    //   'React',
    //   'Friends',
    //   'HYF',
    //   'Programming',
    // ]);
    // const reminderdate = faker.date
    //   .between('2019-10-01', '2019-12-31')
    //   .toISOString()
    //   .slice(0, 10);
    // const listSql = `INSERT INTO list (userId, listname, reminderdate) VALUES ('${userId}','${listname}','${reminderdate}')`;
    // pool.query(listSql);
    const itemName = faker.lorem.sentence(5);
    // const listId = faker.random.number({ min: 11, max: 110 });
    const userId = 11;
    const listId = faker.random.arrayElement([37, 50]);
    const duedate = faker.date
      .between('2019-10-01', '2019-12-31')
      .toISOString()
      .slice(0, 10);
    const completed = faker.random.number({ min: 0, max: 1 });
    const itemSql = `INSERT INTO item (itemname, listId, userId, duedate, completed)
    VALUES ('${itemName}','${listId}','${userId}','${duedate}','${completed}')`;
    pool.query(itemSql);
  }
};

b();
