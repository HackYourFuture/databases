const express = require('express');
const router = express.Router();
const { getTodobyTag } = require('../handlers/tag');

//* Get all Todos by tag
router.get('/:tagname', getTodobyTag);

module.exports = router;
