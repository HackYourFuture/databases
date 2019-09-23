const express = require('express');
const router = express.Router();

const list = require('../controllers/list');

router.post('/create', list.create);
router.post('/delete', list.delete);

module.exports = router;
