const { check } = require('express-validator/check');

exports.registration = [
  check('name')
    .trim()
    .isLength({ min: 5 }),
  check('email')
    .trim()
    .isEmail(),
  check('password')
    .trim()
    .isLength({ min: 6 }),
];

exports.login = [
  check('email')
    .trim()
    .isEmail(),
  check('password')
    .trim()
    .isLength({ min: 6 }),
];
