const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const list_name = req.body.list_name;
  const user_id = req.body.user_id;

  if (user_id != '' && list_name != '') {
    const query =
      "INSERT INTO `todo_lists` (list_name, user_id) VALUES ('" +
      list_name +
      "', '" +
      user_id +
      "')";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(list_name);
    });
  } else {
    res.status(422).send('item name or user id cannot be empty');
  }
});

router.delete('/:id', (req, res) => {
  const listId = req.params.id;

  const deleteQuery = `DELETE FROM todo_lists WHERE list_id = ${listId}`;

  db.query(deleteQuery, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    } else if (results.affectedRows > 0) {
      res.send('Todo List Deleted successfully');
    } else {
      res.send('Deleted failed, check if the id is exist');
    }
  });
});

module.exports = router;
