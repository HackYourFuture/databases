/* eslint-disable require-atomic-updates */
'use-strict';

const db = require('../database/dbHandler');
const { validationResult } = require('express-validator/check');

class User {
  static async create(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const isRegistered = await db.findUser(email, password);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    if (isRegistered.emailRes !== email && errors.isEmpty()) {
      await db.addUser(name, email, password);
      res.json('You have registered successfully');
    } else res.json('The email has already been taken');
  }

  static async login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const userInfo = await db.findUser(email, password);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    if (userInfo.emailRes === email && userInfo.passRes === password && errors.isEmpty()) {
      req.session.email = userInfo.emailRes;
      req.session.items = await db.getItems(userInfo);
      req.session.msg = `Dear ${userInfo.userName}, Welcome back`;
      return res.redirect('/');
    }
    res.json('Check your email/password or Register!');
  }

  static async logout(req, res) {
    if (req.session.email) {
      req.session.destroy();
      res.redirect('/');
    }
  }
}

module.exports = User;
