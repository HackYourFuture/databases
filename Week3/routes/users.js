const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const user_name = req.body.user_name;

  if (user_name != '') {
    const query = "INSERT INTO `users` (user_name) VALUES ('" + user_name + "')";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(user_name);
    });
  } else {
    res.status(422).send('User name cannot be empty');
  }
});

module.exports = router;
