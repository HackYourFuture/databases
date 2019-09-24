const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

router.get('/', user.getAll);

module.exports = router;
