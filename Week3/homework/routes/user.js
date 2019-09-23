const express = require('express');
const router = express.Router();
const validator = require('../actions/validate');

const user = require('../controllers/user');

router.post('/register', validator.registration, user.create);
router.post('/login', validator.login, user.login);
router.get('/logout', user.logout);

module.exports = router;
