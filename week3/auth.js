const express = require('express');
const db = require('./db');
const router = express.Router();

router.post('/login', async (req, res) => {
  const password = (req.body.password) ? require('crypto').createHash('md5').update(req.body.password).digest("hex") : ''
  // console.log(password);
  const users = await db.query('select * from users where name = ?', [req.body.name]);
  // console.log(users);
  const user = users[0];
  // console.log(user);

  if (user) {
    if (user.password === password) {
      req.session.user = user;
      res.json(user);
    }
    else {
      res.status(401).end('Unauthorized');
    }
  }
  else {
    res.status(404).end('User not found');
  }
})

module.exports = router;