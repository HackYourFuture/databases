const Express = require('express');
const userRouter = Express.Router();

userRouter.get('/list', async (req, res) => {
  try {
    const query = `select * from users`;
    const result = await req.db.selectQuery(query);
    console.log(result);
    res.send({ message: 'success', users: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'an error occurred' });
  }
});

userRouter.post('/add', async (req, res) => {
  try {
    const { username, email } = req.body;
    const query = `insert into users (username,email) values ("${username}","${email}")`;
    const result = await req.db.insertQuery(query);
    console.log(result);
    res.send({ message: 'success', userId: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'an error occurred' });
  }
});

userRouter.delete('/delete', async (req, res) => {
  try {
    const { userId } = req.body;
    const query = `delete from users where id=${userId}`;
    const deleteResult = await req.db.deleteQuery(query);
    console.log(deleteResult);
    res.send({ message: 'success', result: deleteResult > 0 });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'an error occurred' });
  }
});

userRouter.put('/update', async (req, res) => {
  try {
    const { userId, username, email } = req.body;
    const query = `update users set username="${username}", email="${email}" where id=${userId}`;
    const updateResult = await req.db.updateQuery(query);
    console.log(updateResult);
    res.send({ message: 'success', result: updateResult > 0 });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'an error occurred' });
  }
});

module.exports = userRouter;
