/* eslint-disable require-atomic-updates */
'use-strict';

const db = require('../database/dbHandler');
const { validationResult } = require('express-validator/check');

class User {
  static async create(req, res) {
    const { name, email, password } = req.body;
    const isRegistered = await db.findUser(email, password);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    if (isRegistered.emailRes !== email && errors.isEmpty()) {
      await db.addUser(name, email, password);
      req.session.msg = `Dear ${name}! You have registered successfully`;
      req.session.email = email;
      return res.redirect('/');
    }
    req.session.msg = 'The email has already been taken';
    return res.redirect('/');
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const userInfo = await db.findUser(email, password);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    if (userInfo.emailRes === email && userInfo.passRes === password && errors.isEmpty()) {
      req.session.email = userInfo.emailRes;
      req.session.msg = `Dear ${userInfo.userName}, Welcome back`;
      return res.redirect('/');
    }
    res.json('Check your email/password or Register!');
  }
  static async getAll(req, res) {
    if (req.session.email) {
      const userId = await db.getUserId(req.session.email);
      req.session.items = await db.getItems(userId);
      const { msg, items } = req.session;
      return res.status(200).json({ msg, items });
    }
    if (req.session.msg) {
      const { msg } = req.session;
      return res.status(401).json({ msg });
    }
    res.status(200).json('Please, login or register!');
  }

  static async logout(req, res) {
    if (req.session.email) {
      req.session.destroy();
      return res.redirect('/');
    }
    return res.redirect('/');
  }
}

module.exports = User;
