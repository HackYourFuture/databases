const { execQuery } = require('./execQuery');
async function addTodoList(req, res) {
  await execQuery('use tododatabase');
  const selectedQuery = `insert into todolist ( Name , Description , IsCompleted , category_id) values ( ?, ?, ?, ?)`;
  await execQuery(
    selectedQuery,
    [req.body.Name, req.body.Description, req.body.IsCompleted, req.body.category_id],
    (err, rows) => {
      if (err) {
        res.status(404).send({ Error: err });
        res.end();
      } else {
        res.status(201).send({ Succeeded: `one row has been added` });
        res.end();
      }
    },
  );
}

module.exports.addTodoList = addTodoList;
