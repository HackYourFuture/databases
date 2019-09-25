const express = require('express');
const router = express.Router();
const {
  getListById,
  deleteList,
  getTodos,
  getTodoById,
  addTodoWithTags,
  deleteTodo,
  markTodoDone,
  markTodoNotDone,
} = require('../handlers/list');

//* Get a list by listid
router.get('/:listid', getListById);

//* Delete a list by listid
router.delete('/:listid', deleteList);

//* Get all Todos of a list by listid
router.get('/:listid/todo', getTodos);

//* Get Todo by todoid
router.get('/:listid/todo/:todoid', getTodoById);

//* Add new Todo to a list by listid, [optional] add multiple tags
router.post('/:listid/todo', addTodoWithTags);

//* Delete a Todo by todoid
router.delete('/:listid/todo/:todoid', deleteTodo);

//* Mark Todo as done
router.patch('/:listid/todo/:todoid/done', markTodoDone);

//* Mark Todo as not done
router.patch('/:listid/todo/:todoid/undone', markTodoNotDone);

module.exports = router;
