const { execQuery } = require('./functions');

async function addTodoList(req, res) {
  try {
    await execQuery('use tododatabase');
    const selectedQuery = `insert into todolist ( Name , Description , IsCompleted , category_id) values ( ?, ?, ?, ?)`;
    await execQuery(selectedQuery, [
      req.body.Name,
      req.body.Description,
      req.body.IsCompleted,
      req.body.category_id,
    ]);
    res.status(201).send({ Succeeded: `one row has been added` });
  } catch (error) {
    res.status(404).send({ Error: error });
  }
  res.end();
}

module.exports.addTodoList = addTodoList;
