const express = require('express');
const router = express.Router();
const { getTodobyTag } = require('../helpers');

//* Get all Todos by tag
router.get('/:tagname', getTodobyTag);

module.exports = router;
