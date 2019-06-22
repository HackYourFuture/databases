const { execQuery } = require('./execQuery');
async function getRowById(req, res) {
  await execQuery('use tododatabase');
  const selectedQuery = `select * from ${req.params.tableName} where ID = ?`;
  await execQuery(selectedQuery, req.params.id, (err, rows) => {
    if (err || rows == '') {
      res.status(404).send({ Error: err });
      res.end();
    } else {
      res.status(200).send(rows);
      res.end();
    }
  });
}

module.exports.getRowById = getRowById;
