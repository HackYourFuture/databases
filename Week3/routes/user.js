const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  getUserLists,
  createList,
} = require('../helpers');

//* Get all users
router.get('/', getUsers);

//* Get a user by userid
router.get('/:userid', getUserById);

//* Create new user
router.post('/', createUser);

//* Delete a user by userid
router.delete('/:userid', deleteUser);

//* Get lists of a user by userid
router.get('/:userid/list', getUserLists);

//* Create new list for a user, [optional] set a reminder alert
router.post('/:userid/list', createList);

module.exports = router;
