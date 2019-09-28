const express = require('express');
const router = express.Router();
const { execQuery } = require('../connection');
const { listQueries } = require('../queries');
const { ErrorHandler } = require('../helpers/error');

const getItems = async () => {
  try {
    router.get('/', async (req, res) => {
      await execQuery(listQueries[5], (err, rows, fields) => {
        if (rows.length === 0) {
          throw new ErrorHandler(404, 'There is no item.');
        }
        res.send(rows);
      });
    });
  } catch (err) {
    next(err);
  }
};

const addItem = async () => {
  try {
    router.post('/:id', async (req, res) => {
      let list = req.body;
      await execQuery(
        listQueries[4],
        [list[0].item_header, list[0].item_body, req.params.id],
        (err, rows, fields) => {
          if (list[0].item_header.length === 0) {
            throw new ErrorHandler(500, 'You should fill header');
          } else if (list[0].item_body.length === 0) {
            throw new ErrorHandler(500, 'You should fill body');
          } else {
            res.send(rows);
          }
        },
      );
    });
  } catch (err) {
    next(err);
  }
};

const deleteItem = async () => {
  try {
    router.delete('/:id', async (req, res) => {
      const ids = req.params.id.split(',');
      await execQuery(listQueries[6], [ids], (err, rows, fields) => {
        res.send('Item(s) deleted successfully');
      });
    });
  } catch (err) {
    next(err);
  }
};

const markItem = async () => {
  try {
    router.put('/:id', async (req, res) => {
      let list = req.body;
      await execQuery(listQueries[7], [list[0].done, req.params.id], (err, rows, fields) => {
        res.send(rows);
      });
    });
  } catch (err) {
    next(err);
  }
};

(async () => {
  try {
    await addItem();
    await getItems();
    await deleteItem();
    await markItem();
  } catch (error) {
    console.log(error.message);
  }
})();

module.exports = router;
