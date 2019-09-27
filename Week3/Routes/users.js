const express = require('express');
const router = express.Router();
const { execQuery } = require('../connection');
const { userQueries } = require('../queries');
const { ErrorHandler } = require('../helpers/error')

const getAllUsers = async () => {
  try {
    router.get('/', async (req, res) => {
      await execQuery(userQueries[0],  (err, rows, fields) => {
        res.send(rows);
      });
    });
  } catch (err) {
    console.log(err);
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
    console.log(err);
  }
};

const deleteUser = async () => {
  try {
    router.delete('/:id', async (req, res) => {
      await execQuery(userQueries[2], [req.params.id], (err, rows, fields) => {
        res.send('User deleted successfully');
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const addUser = async () => {
  try {
    router.post('/',async (req, res) => {
      const user = req.body;
      await execQuery(userQueries[3], [user[0].username,user[0].email],  (err, rows, fields) => {
        if(!user[0].username){
          throw new ErrorHandler(404,'You must fill username.')
        }else if(rows === undefined){
          throw new ErrorHandler(404,'This email is already registered')
        }else{
          res.send(rows);
        }; 
      });
      next()
    });
  } catch (err) {
    next(err);
  }
};

const editUser = async () => {
  try {
    router.put('/:id', async (req, res) => {
      let user = req.body;
      await execQuery(userQueries[4], [user[0].username, req.params.id], (err, rows, fields) => {
        if(!user[0].username){
          throw new ErrorHandler(404,'You must fill username.')
        }else{
          res.send(rows);
        }
      });
      next()
    });
  } catch (err) {
      next(err) ;
  }
};

(async () => {
  try {
    await getAllUsers();
    await getUser();
    await deleteUser();
    await addUser();
    await editUser();
  } catch (error) {
    console.log(error.message);
  }
})();


module.exports = router;
