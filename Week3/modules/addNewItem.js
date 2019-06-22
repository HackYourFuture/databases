const { execQuery } = require('./execQuery');

async function addNewItem(req, res) {
  await execQuery('use tododatabase');
  const selectedQuery = `insert into items ( Name, Description) values ( ?, ?)`;
  await execQuery(selectedQuery, [req.body.Name, req.body.Description], (err, rows) => {
    if (err) {
      res.status(404).send({ Error: err });
      res.end();
    } else {
      res.status(201).send({ Succeeded: 'has been succeeded' });
      res.end();
    }
  });
}

module.exports.addNewItem = addNewItem;
