const express = require('express');
const router = express.Router();
const { execQuery } = require('../connection');
const { listQueries } = require('../queries');

const getAllLists = async () => {
  try {
    router.get('/', async (req, res) => {
      await execQuery(listQueries[0], (err, rows, fields) => {
        res.send(rows);
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const addList = async () => {
  try {
    router.post('/:id', async (req, res) => {
      let list = req.body;
      await execQuery(listQueries[1], [list[0].list_name, req.params.id], (err, rows, fields) => {
        res.send(rows);
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteList = async () => {
  try {
    router.delete('/:id', async (req, res) => {
      await execQuery(listQueries[2], [req.params.id], (err, rows, fields) => {
        res.send('List deleted successfully');
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const updateReminder = async ()=>{
  try {
    router.put('/:id', async (req, res) => {
      let list = req.body;
      await execQuery(listQueries[3], [list[0].reminder, req.params.id], (err, rows, fields) => {
        res.send(rows);
      });
    })
  } catch (err) {
    console.log(err);
  }

}

(async () => {
  try {
    await getAllLists();
    await addList();
    await deleteList();
    await updateReminder();
  } catch (error) {
    console.log(error.message);
  }
})();

module.exports = router;
