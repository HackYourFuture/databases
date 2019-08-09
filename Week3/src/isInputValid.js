'use strict';

const { ErrorWithStatus } = require('./error');

const USERS_REG = /^\/users$/i;
const LISTS_REG = /^\/lists$/i;
const ITEMS_REG = /^\/items$/i;
const REMINDERS_REG = /^\/reminders$/i;
const ADD_REMINDER_REG = /^\/lists\/[0-9]{3}\/reminders\/[0-9]{3}$/i;
const ADD_ITEM_TO_LIST_REG = /^\/lists\/[0-9]{3}\/items\/[0-9]{3}$/i;
const ITEM_DONE_REG = /^\/lists\/[0-9]{3}\/items\/[0-9]{3}\/done$/i;
const DEL_ITEM_FROM_LIST_REG = /^\/lists\/[0-9]{3}\/items\/[0-9]{3}$/i;
const LISTS_AND_USERS_REG = /^\/lists\/[0-9]{3}\/users\/[0-9]{3}$/i;

const isInputValid = request => {
  if (request.headers['content-type'] !== 'application/json') {
    throw new ErrorWithStatus('Please set the content type to application/json', 400);
  }
  switch (true) {
    case USERS_REG.test(request.path):
      const { username, gender } = request.body;
      if (
        !username ||
        username === null ||
        username === '' ||
        username.length === 0 ||
        typeof username !== 'string'
      ) {
        throw new ErrorWithStatus('Please provide a valid username. (username)', 400);
      }
      if (gender || gender === '') {
        if (gender !== 'M' && gender !== 'F') {
          throw new ErrorWithStatus('Please provide a valid gender. ( M / F )', 400);
        }
      }
      return { username, gender: gender ? gender : null };
    case LISTS_REG.test(request.path):
      const { name, description, created, done } = request.body;
      if (!name) {
        throw new ErrorWithStatus('Please provide a list name (name).', 400);
      }
      return {
        name,
        description: description ? description : null,
        created: created ? created : null,
        done: done ? done : 'F',
      };
    case ITEMS_REG.test(request.path):
      const { todo } = request.body;
      if (!todo || todo === null || todo === '' || todo.length === 0 || typeof todo !== 'string') {
        throw new ErrorWithStatus('Please provide a valid todo (todo).', 400);
      }
      return { todo };
    case REMINDERS_REG.test(request.path):
      const { title, when } = request.body;
      if (!when) {
        throw new ErrorWithStatus(
          'You must provide a title (title) and time (when) for reminder.',
          400,
        );
      }
      return { title: title ? title : null, when };
    case ADD_REMINDER_REG.test(request.path):
      return { reminderId: request.params.reminderId, listId: request.params.listId };
    case ADD_ITEM_TO_LIST_REG.test(request.path):
    case ITEM_DONE_REG.test(request.path):
    case DEL_ITEM_FROM_LIST_REG.test(request.path):
      return { listId: request.params.listId, itemId: request.params.itemId };
    case LISTS_AND_USERS_REG.test(request.path):
      return { userId: request.params.userId, listId: request.params.listId };
    default:
      throw new ErrorWithStatus(
        `Your request path includes something that does not yet supported. Please change it and try again.
        Also please take a look at todoAppREADME.md for more information.`,
        400,
      );
  }
};

module.exports = isInputValid;
