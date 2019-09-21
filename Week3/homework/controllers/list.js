'use-strict';

const pool = require('../database/connection').pool;

class List {
  static async create(req, res) {
    const results = {
      sessionData: req.session.test || 'not found',
    };

    if (results.sessionData === 'not found') {
      return res.json('You should login again');
    }
    const userName = req.session.user;
    const userEmail = req.session.email;
    const userSql = `SELECT id FROM user WHERE name=? && email=? `;
    const Id = await pool.query(userSql, [userName, userEmail]);
    const userId = JSON.parse(JSON.stringify(Id[0].id));
    const listName = req.body.listName;
    const reminderDate = req.body.reminderDate;
    const q = 'INSERT INTO list SET userId=?, listname=?, reminderdate=?';
    await pool.query(q, [userId, listName, reminderDate]);
    res.json('The list is successfully created!');
  }
}

module.exports = List;
