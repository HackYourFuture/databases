const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json('This is a todo app. To continue, please login or register!');
});

module.exports = router;
