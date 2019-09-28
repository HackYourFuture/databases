const express = require('express');
const router = express.Router();
const { execQuery } = require('../connection');
const { listQueries } = require('../queries');
const { ErrorHandler } = require('../helpers/error');

router.get('/', async (req, res) => {
  try {
    await execQuery(listQueries[0], (err, rows, fields) => {
      res.send(rows);
    });
  } catch (err) {
    next(err);
  }
});

router.post('/:id', async (req, res, next) => {
  try {
    let list = req.body;
    for (let i = 0; i < list.length; i++) {
      if (list[0].list_name.length === 0) {
        throw new ErrorHandler(500, 'You must fill list name');
      }
      await execQuery(listQueries[1], [list[0].list_name, req.params.id]);
      res.send(list);
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const todoLists = await execQuery(listQueries[0]);
    const todo = todoLists.find(todo => todo.list_id === id);
    if (!todo) {
      throw new ErrorHandler(500, 'Id did not match/find');
    } else {
      await execQuery(listQueries[2], [id]);
      res.send('List deleted successfully');
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    let list = req.body;
    await execQuery(listQueries[3], [list[0].reminder, req.params.id]);
    res.send(list);
  } catch (err) {
    res.end(err);
  }
});

module.exports = router;
