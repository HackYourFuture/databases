const { execQuery } = require('./execQuery');

async function removeItem(req, res) {
  try {
    await execQuery('use tododatabase');
    let ID = req.params.id;
    const selectedRow = `select ID from items where ID = ?`;
    const exsist = await execQuery(sql, ID);
    if (exsist.length !== 0) {
      const selectedQuery = `delete from items where ID = ?`;
      await execQuery(selectedQuery, selectedRow, (error, rows) => {
        if (error) throw error;
        res.status(200).send({ Succeeded: 'has been removed' });
        res.end();
      });
    } else {
      res.status(404).send({ Error: 'invalide id' });
      res.end();
    }
  } catch (error) {
    res.status(201).send({ Error: error });
    res.end();
  }
}

module.exports.removeItem = removeItem;
