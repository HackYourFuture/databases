const express = require('express');
const router = express.Router();
const db = require('./db');

/* Get lists of logged in user */
router.get('/', async (req, res) => {
  const user = req.session.user;
  if (user) {
    const lists = await db.query('select * from todo_lists where user_id = ?', [user.id]);
    res.json(lists);
  }
  else { res.status(401).end('Unauthorized'); }
})

/* Get list (by its id) */
router.get('/:id', async (req, res) => {
  const user = req.session.user;
  if (user) {
    const lists = await db.query('select * from todo_lists where id = ?', [req.params.id]);
    const list = lists[0];
    if (list.user_id !== user.id) {
      res.status(401).end('Unauthorized');
    }

    list.items = await db.query('select * from todo_items where list_id = ? ', [list.id]);
    res.json(list);
  }
  else {
    res.status(401).end('Unauthorized');
  }
})

/* Create a new list */
router.post('/', async (req, res) => {
  const user = req.session.user;
  console.log(user);
  if (user) {
    const list_title = req.body.title;
    if (!list_title) {
      res.status(400).end('List title required');
      return
    }
    await db.query('insert into todo_lists (user_id, title, created_at) values (? , ?, NOW())', [user.id, list_title]);
    res.end("List " + list_title + " has been created");
  }
  else {
    res.status(401).end('Unauthorized');
  }
})

/* Delete list (by its id) */
router.delete('/:id', async (req, res) => {
  const user = req.session.user;
  if (user) {
    const list_id = req.params.id;
    const lists = await db.query('select * from todo_lists where id = ? and user_id = ?', [list_id, user.id]);
    if (lists[0]) {
      await db.query('delete from todo_items where list_id = ?', [list_id]);
      await db.query('delete from todo_lists where id = ? and user_id = ?', [list_id, user.id]);
      res.end(`List ${lists[0].title} has been deleted`);
    } else { res.status(400).end('List not found') }
  } else { res.status(401).end('Unauthorized') }
})

/* Create a new list's remider */
router.post('/reminder/:id', async (req, res) => {
  const user = req.session.user
  if (user) {
    const list_id = req.params.id
    const lists = await db.query('select * from todo_lists where id = ? and user_id = ?', [list_id, user.id])

    if (lists[0]) {
      const reminder_text = req.body.text
      if (!reminder_text) {
        res.status(400).end('Reminder text required')
        return
      }

      const reminder_time = req.body.datetime;
      if (!reminder_time) {
        res.status(400).end('Reminder time required')
        return
      }

      const list_id = lists[0].id;
      await db.query('insert into reminders (list_id, text, date) values (? , ?, ?)', [list_id, reminder_text, reminder_time])
      res.end(`Reminder '${reminder_text}' has been created`)
    }
    else {
      res.status(400).end('List not found')
    }
  }
  else {
    res.status(401).end('Unauthorized')
  }
})

module.exports = router