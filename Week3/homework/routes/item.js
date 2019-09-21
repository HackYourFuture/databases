const express = require('express');
const router = express.Router();

const item = require('../controllers/item');

router.post('/create', item.create);

module.exports = router;
