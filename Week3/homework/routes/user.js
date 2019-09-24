const express = require('express');
const router = express.Router();
const validator = require('../validator/validate');

const user = require('../controllers/user');

router
  .post('/register', validator.registration, user.create)
  .post('/login', validator.login, user.login)
  .get('/logout', user.logout);

module.exports = router;
