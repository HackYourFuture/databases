const express = require('express');
const router = express.Router();

router.use('/todos', require('./todos'));
router.use('/users', require('./users'));
router.use('/categories', require('./categories'));
router.use('/todo-lists', require('./todoLists'));

module.exports = router;
