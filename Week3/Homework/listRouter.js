const Express = require('express');
const listRouter = Express.Router();

listRouter.get('/get', async (req, res) => {
  try {
    const { userId } = req.body;

    const query = `select * from todoList where users_id="${userId}"`;
    const result = await req.db.selectQuery(query);
    console.log(result);
    res.send({ message: 'success', list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'an error occurred' });
  }
});

listRouter.post('/insert', async (req, res) => {
  try {
    const { userId, listName, deadline } = req.body;

    const query = `insert into todoList (users_id,list_name,deadline) values ("${userId}","${listName}","${deadline}")`;
    const result = await req.db.insertQuery(query);
    console.log(result);
    res.send({ message: 'success', insertId: result }); //
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'an error occurred' });
  }
});

listRouter.delete('/delete', async (req, res) => {
  try {
    const { userId, listName } = req.body;

    const query = `delete from todoList where users_id="${userId}" and list_Name="${listName}" `;
    const deleteResult = await req.db.insertQuery(query);
    console.log(deleteResult);
    res.send({ message: 'success', result: deleteResult > 0 });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'an error occurred' });
  }
});

module.exports = listRouter;
