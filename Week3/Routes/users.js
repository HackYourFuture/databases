const express = require('express');
const router = express.Router();
const { execQuery } = require('../connection');
const { userQueries } = require('../queries');
const { ErrorHandler } = require('../helpers/error');

const getAllUsers = async () => {
  try {
    router.get('/', async (req, res) => {
      await execQuery(userQueries[0], (err, rows, fields) => {
        res.send(rows);
      });
    });
  } catch (err) {
    next(err);
  }
};

const getUser = async () => {
  try {
    router.get('/:id', async (req, res) => {
      await execQuery(userQueries[1], [req.params.id], (err, rows, fields) => {
        res.send(rows);
      });
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async () => {
  try {
    router.delete('/:id', async (req, res) => {
      await execQuery(userQueries[2], [req.params.id]);
      res.send('User deleted successfully');
    });
  } catch (err) {
    next(err);
  }
};

router.post('/', async (req, res, next) => {
  try {
    let user = req.body;
    const { email } = req.body;
    const users = await execQuery(userQueries[0]);
    const registered = users.find(user => user.email === email);

    for (let i = 0; i < user.length; i++) {
      if (!user[i].username) {
        throw new ErrorHandler(404, 'You must fill username.');
      } else if (registered) {
        throw new ErrorHandler(404, 'This email has already registered');
      } else {
        await execQuery(userQueries[3], [user[i].username, user[i].email]);
        res.send(user);
      }
    }
  } catch (err) {
    next(err);
  }
});

const editUser = async () => {
  try {
    router.put('/:id', async (req, res) => {
      let user = req.body;
      await execQuery(userQueries[4], [user[0].username, req.params.id]);
      if (!user[0].username) {
        throw new ErrorHandler(404, 'You must fill username.');
      } else {
        res.send(user);
      }
    });
  } catch (err) {
    next(err);
  }
};

(async () => {
  try {
    await getAllUsers();
    await getUser();
    await deleteUser();
    await editUser();
  } catch (error) {
    console.log(error.message);
  }
})();

module.exports = router;
