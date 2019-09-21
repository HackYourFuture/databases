const express = require('express');
const router = express.Router();

const list = require('../controllers/list');

router.post('/create', list.create);

module.exports = router;
