const Express = require('express');
const itemRouter = Express.Router();

itemRouter.get('/get', async (req, res) => {
  try {
    const { listId } = req.body;

    const query = `select * from listItem where todoList_ID="${listId}"`;
    const result = await req.db.selectQuery(query);
    console.log(result);
    res.send({ message: 'success', list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'an error occurred' });
  }
});

itemRouter.post('/insert', async (req, res) => {
  try {
    const { listId, listName, itemName } = req.body;

    const query = `insert into listItem (todoList_id,item_name) values ("${listId}","${itemName}")`;
    const result = await req.db.insertQuery(query);
    console.log(result);
    res.send({ message: 'success', insertId: result }); //
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'an error occurred' });
  }
});

itemRouter.delete('/delete', async (req, res) => {
  try {
    const { listId, itemName } = req.body;

    const query = `delete from listItem where todoList_id="${listId}" and item_name="${itemName}" `;
    const deleteResult = await req.db.insertQuery(query);
    console.log(deleteResult);
    res.send({ message: 'success', result: deleteResult > 0 });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'an error occurred' });
  }
});

itemRouter.put('/mark', async (req, res) => {
  try {
    const { listId, isDone, itemName } = req.body;
    const query = `update listItem set is_Done="${isDone}" where todoList_id=${listId} and item_Name="${itemName}"`;
    const updateResult = await req.db.updateQuery(query);
    console.log(updateResult);
    res.send({ message: 'success', result: updateResult > 0 });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'an error occurred' });
  }
});

module.exports = itemRouter;
