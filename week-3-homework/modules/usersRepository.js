const database = require('./database');


// User repository
// findAll users
async function  getUsers() {
    return database.query('SELECT * from users');
};

// add [amount] money to the account defined by [userId] 
async function  addMoney(userId, amount) {
  var data = [amount, userId];
    return database.query('UPDATE users SET money = money + ? where id = ?', data);
};

// add [amount] money to the account defined by [userFrom] from the user defined by [userTo] 
// protected by a transaction
// change all the awaits for an await to all. Is it a good idea? Why? Why not? Where would you put it
async function  transferWithTransaction(userFrom, userTo, amount) {
  await database.beginTransaction();
  try {
    await addMoney(userFrom, -amount);
    await addMoney(userTo, amount); 
    await database.commit();
  } catch (e) {
    console.info('Good that im here to rollback');
    await database.rollback();
  }
};

module.exports = {
  getUsers, addMoney, transferWithTransaction
};