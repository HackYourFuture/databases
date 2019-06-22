const { execQuery } = require('./execQuery');
async function getAllRows(req, res) {
  await execQuery('use tododatabase');
  const selectedQuery = `select * from ${req.params.tableName}`;
  await execQuery(selectedQuery, (err, rows) => {
    if (err) {
      res.status(404).send({ Error: err });
      res.end();
    } else {
      res.status(200).send(rows);
      res.end();
      req.params.id;
    }
  });
}

module.exports.getAllRows = getAllRows;
