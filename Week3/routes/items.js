const express = require('express');
const router = express.Router();

// Post data
router.post('/', (req, res) => {
  const item_name = req.body.item_name;
  const user_id = req.body.user_id;
  const list_id = req.body.list_id;
  const completed = 0;

  if (user_id != '' && list_id != '' && item_name != '') {
    const query =
      "INSERT INTO `todo_items` (item_name, user_id, list_id, completed) VALUES ('" +
      item_name +
      "', '" +
      user_id +
      "', '" +
      list_id +
      "', '" +
      completed +
      "')";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(item_name);
    });
  } else {
    res.status(422).send('item name or user id or list id cannot be empty');
  }
});

// Mark as completed
router.post('/:id/markAsComplete', (req, res) => {
  const itemId = req.params.id;
  const completed = 1;
  if (!itemId) {
    res.status(404).send('This Item ID is not exist, please pick up another one');
  }

  const query = `UPDATE todo_items SET completed = ${completed} `;
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    } else if (result.affectedRows > 0) {
      res.send('Updated successfully');
    } else {
      res.send('Cannot update this item');
    }
  });
});

// Delete item
router.delete('/:id', (req, res) => {
  const itemId = req.params.id;

  const deleteQuery = 'DELETE FROM todo_items WHERE item_id = "' + itemId + '"';

  db.query(deleteQuery, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Deleted successfully');
  });
});

module.exports = router;
