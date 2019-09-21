/* eslint-disable require-atomic-updates */
'use-strict';

const pool = require('../database/connection').pool;
const { validationResult } = require('express-validator/check');

class User {
  static async create(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const validateEmail = await User.find(email);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    if (validateEmail.emailResponse !== 'registered email' && errors.isEmpty()) {
      const q = 'INSERT INTO user SET name=?, email=?, password=?';
      await pool.query(q, [name, email, password]);
      res.json('You have registered successfully');
    } else res.json('The email has already been taken');
  }
  static async find(email, password) {
    let emailResponse,
      passResponse,
      userId,
      userResponse = '';
    const q = 'SELECT * FROM user WHERE email=?';
    const result = await pool.query(q, [email, password]);
    const resultObj = JSON.parse(JSON.stringify(result));
    if (resultObj.length) {
      emailResponse = email === resultObj[0].email ? 'registered email' : 'not registered';
      passResponse = password === resultObj[0].password ? 'registered user' : 'invalid pass';
      userResponse = resultObj[0].name;
      userId = resultObj[0].id;
    } else emailResponse = 'Not registered';
    return { emailResponse, email, passResponse, userResponse, userId };
  }
  static async login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const userInfo = await User.find(email, password);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    if (
      userInfo.emailResponse === 'registered email' &&
      userInfo.passResponse === 'registered user' &&
      errors.isEmpty()
    ) {
      req.session.user = userInfo.userResponse;
      req.session.email = userInfo.email;
      req.session.test = 'test';
      const q = `
      SELECT i.listId, l.reminderdate, l.listname, i.id, i.itemname, i.duedate, i.completed 
      FROM item i
      JOIN list l
        ON i.listId = l.id
       WHERE l.userId=?         
      `;
      const items = await pool.query(q, [userInfo.userId]);
      const msg = `Dear ${userInfo.userResponse}, welcome back`;
      res.json({ msg, items });
    }
  }
}

module.exports = User;
