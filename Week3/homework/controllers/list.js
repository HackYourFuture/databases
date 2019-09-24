/* eslint-disable require-atomic-updates */
'use-strict';

const db = require('../database/dbHandler');

class List {
  static async create(req, res) {
    if (!req.session.email) {
      return res.json('You should login again');
    }

    const userEmail = req.session.email;
    const userId = await db.getUserId(userEmail);

    const { listName, reminderDate } = req.body;

    if (listName && reminderDate) {
      await db.createList(userId, listName, reminderDate);
      req.session.msg = 'The list is successfully created!';
      return res.redirect('/');
    }
    res.json('The list could not be created!');
  }

  static async delete(req, res) {
    if (!req.session.email) {
      return res.json('You should login again');
    }

    const userEmail = req.session.email;
    const userId = await db.getUserId(userEmail);

    const { listName, listId } = req.body;

    if (listName && listId) {
      req.session.msg = 'The list is successfully deleted!';
      await db.deleteList(listId, userId, listName);
      return res.redirect('/');
    }
    res.json('The list could not be deleted');
  }
}

module.exports = List;
