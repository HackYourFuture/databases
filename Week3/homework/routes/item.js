const express = require('express');
const router = express.Router();

const item = require('../controllers/item');

router.post('/create', item.create);
router.post('/delete', item.delete);
router.post('/complete', item.complete);
router.put('/complete', item.complete);

module.exports = router;
