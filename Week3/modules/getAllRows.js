const { execQuery } = require('./functions');
async function getAllRows(req, res) {
  try {
    await execQuery('use tododatabase');
    const selectedQuery = `select * from ${req.params.tableName}`;
    const result = await execQuery(selectedQuery);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).send({ Error: err });
  }
  res.end();
}

module.exports.getAllRows = getAllRows;
