const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.email) {
    const { msg, items } = req.session;
    return res.json({ msg, items });
  }
  res.json('Please, login to your account!');
});

module.exports = router;
