'use-strict';

const pool = require('../database/connection').pool;

class Item {
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
    const listId = req.body.listid;
    const itemName = req.body.itemname;
    const dueDate = req.body.duedate;
    const validateListid = `SELECT id FROM list WHERE userId=? && id=?`;
    const result = await pool.query(validateListid, [userId, listId]);
    const resultObj = JSON.parse(JSON.stringify(result));
    console.log(resultObj);
    if (resultObj.length) {
      const q = `INSERT INTO item SET userId=?, listId=?, itemname=?, duedate=?`;
      await pool.query(q, [userId, listId, itemName, dueDate]);
      res.json('The item is successfully created!');
    } else {
      res.json('Bad request');
    }
  }
}

module.exports = Item;
