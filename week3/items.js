const express = require('express');
const router = express.Router();
const db = require('./db');

/* Create a new item into given list id */
router.post('/:id', async (req, res) => {
  const user = req.session.user;
  if (user) {
    const item_title = req.body.title;
    if (!item_title) {
      res.status(400).end('Item title required');
      return
    }

    const list_id = req.params.id;
    const lists = await db.query('select * from todo_lists where id = ? and user_id = ?', [list_id, user.id]);

    if (lists[0]) {
      await db.query('insert into todo_items (list_id, title) values (? , ?)', [list_id, item_title]);
      res.end('Item ' + item_title + ' has been created');
    }
    else {
      res.status(400).end('List not found');
    }
  }
  else {
    res.status(401).end('Unauthorized');
  }
})

/* Delete item (by its id) */
router.delete('/:id', async (req, res) => {
  const user = req.session.user;
  if (user) {
    const item_id = req.params.id;
    const items = await db.query('select * from todo_items where id = ? and list_id in (select id from todo_lists where user_id = ?)', [item_id, user.id]);

    if (items[0]) {
      await db.query('delete from todo_items where id = ?', [item_id]);
      res.end(`Item '${items[0].title}' has been deleted`);
    }
    else {
      res.status(400).end('Item not found');
    }
  }
  else {
    res.status(401).end('Unauthorized');
  }
})

/* Mark item (by its id) as completed */
router.put('/:id', async (req, res) => {
  const user = req.session.user;
  if (user) {
    const item_id = req.params.id;
    const items = await db.query('select * from todo_items where id = ? and list_id in (select id from todo_lists where user_id = ?)', [item_id, user.id]);

    if (items[0]) {
      await db.query('update todo_items set is_completed = true where id = ?', [item_id]);
      res.end(`Item '${items[0].title}' has been marked as completed`);
    }
    else {
      res.status(400).end('Item not found');
    }
  }
  else {
    res.status(401).end('Unauthorized');
  }
})

module.exports = router;