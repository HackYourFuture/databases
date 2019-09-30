const { execQuery } = require('../db/db_connection');
class User {
  async getUsersHandler(req, res) {
    const users = await execQuery(`SELECT * FROM todos_app.users`);
    if (!users.length) return res.status(404).send(`You need to insert some users!`);
    res.send(users);
  }

  async getUserHandler(req, res) {
    const userId = req.params.id;
    const user = await execQuery(`SELECT * FROM todos_app.users WHERE User_id = ?`, [userId]);
    if (!user.length) return res.status(404).send('The user with the given Id was not Found!');
    res.send(user);
  }

  async createUserHandler(req, res) {
    const { Name, Email } = req.body;
    const create = `INSERT INTO todos_app.users (Name, Email) VALUES (?, ?)`;
    await execQuery(create, [Name, Email]);
    res.end('User was successful created!');
  }

  async deleteUserHandler(req, res) {
    const users = await execQuery(`SELECT * FROM todos_app.users`);
    const id = parseInt(req.params.id);
    const user = users.find(user => user.user_id === id);
    if (!user) return res.status(404).send('The user with the given Id was not Found!');
    await execQuery(`Delete FROM todos_app.users where user_id = ?`, id);
    res.send('User deleted successfully');
  }

  async updateUser(req, res) {
    const users = await execQuery(`SELECT * FROM todos_app.users`);
    const id = parseInt(req.params.id);
    const user = users.find(user => user.user_id === id);
    if (!user) return res.status(404).send('The user with the given Id was not Found!');
    const { Name, Email } = req.body;
    await execQuery(`UPDATE users SET Name = ?, Email = ? WHERE user_id = ${id}`, [Name, Email]);
    res.end('The update was successful!');
  }
}

module.exports = User;
