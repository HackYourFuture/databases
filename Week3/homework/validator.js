const { check } = require('express-validator/check');

exports.registration = [
  check('username')
    .trim()
    .isLength({ min: 3 }),
  check('name')
    .trim()
    .isLength({ min: 3 }),
  check('password')
    .trim()
    .isLength({ min: 3 }),
];

exports.login = [
  check('username')
    .trim()
    .isLength({ min: 3 }),
  check('password')
    .trim()
    .isLength({ min: 3 }),
];
