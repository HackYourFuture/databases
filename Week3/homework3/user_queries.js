const { execQuery } = require('./connection');

const getAllUsers = async (req, res) => {
  try {
    const users = await execQuery(`SELECT * FROM todo_app.user`);
    if (!users.length) return res.status(404).send(`No user!`);
    res.send(users);
  } catch (err) {
    console.log(err.message);
  }
};
const getUserbyID = async (req, res) => {
  const { userid } = req.params;
  try {
    const user = await execQuery(`SELECT * FROM todo_app.user WHERE user.ID= ?`, [userid]);
    if (!user.length) return res.status(404).send('Wrong ID!');
    res.send(user);
  } catch (err) {
    console.log(err);
  }
};

const createANewUser = async (req, res) => {
  try {
    const { Name } = req.body;
    await execQuery(`INSERT INTO todo_app.user (Name) VALUES (?)`, [Name]);
    res.end('A new todo item added!');
  } catch (err) {
    console.error(err);
  }
};

const deleteAUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await execQuery(`SELECT * FROM todo_app.user`);
    const todo = user.find(todo => todo.ID === id);
    console.log(user);
    if (!user) return res.status(404).send('ID not Found!');
    await execQuery('DELETE FROM todo_item WHERE todo_item.ID = ?', [id]);
    res.send('User deleted successfully');
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  getAllUsers,
  getUserbyID,
  createANewUser,
  deleteAUser,
};
