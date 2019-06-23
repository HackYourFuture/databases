const { execQuery } = require('./functions');

async function addNewItem(req, res) {
  try {
    await execQuery('use tododatabase');
    const selectedQuery = `insert into items ( Name, Description) values ( ?, ?)`;
    await execQuery(selectedQuery, [req.body.Name, req.body.Description]);
    res.status(201).send({ Succeeded: 'has been succeeded' });
  } catch (error) {
    res.status(404).send({ Error: err });
  }
  res.end();
}

module.exports.addNewItem = addNewItem;
