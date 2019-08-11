var isTimestamp = require('validate.io-timestamp');

function isInputValid(request) {
  try {
    if (request.headers['content-type'] === 'application/json') {
      const table = Object.keys(request.body)[0];
      let errMessage = {};
      let isValid = true;
      switch (table) {
        case 'user':
          request.body[table].forEach(element => {
            if (Object.keys(element)[2] === undefined) {
              if (element.hasOwnProperty('Name') && element.hasOwnProperty('Email')) {
                if (
                  typeof element.Name !== 'string' ||
                  element.Name == undefined ||
                  element.Name == null ||
                  element.Name == ''
                ) {
                  errMessage = { Error: `Name is not valid!` };
                  isValid = false;
                }
                if (
                  typeof element.Email !== 'string' ||
                  element.Email == undefined ||
                  element.Email == null ||
                  element.Email == ''
                ) {
                  errMessage = { Error: `Email is not valid!` };
                  isValid = false;
                }
              } else {
                errMessage = { Error: `There is no Name or Email property on the ${table} object` };
                isValid = false;
              }
            } else {
              errMessage = { Error: `There is more than two property on the object!` };
              isValid = false;
            }
          });
          if (isValid) {
            return true;
          } else return errMessage;

        case 'todolist':
          request.body[table].forEach(element => {
            if (Object.keys(element)[3] === undefined) {
              if (
                element.hasOwnProperty('Name') &&
                element.hasOwnProperty('User_ID') &&
                element.hasOwnProperty('Reminder_ID')
              ) {
                if (
                  element.Name == undefined ||
                  typeof element.Name !== 'string' ||
                  element.Name == null ||
                  element.Name == ''
                ) {
                  errMessage = { Error: `Name is not valid!` };
                  isValid = false;
                }
                if (
                  element.User_ID == undefined ||
                  typeof element.User_ID !== 'number' ||
                  element.User_ID == null ||
                  element.User_ID == ''
                ) {
                  errMessage = { Error: `User_ID is not valid!` };
                  isValid = false;
                }
                if (
                  element.Reminder_ID == undefined ||
                  typeof element.Reminder_ID !== 'number' ||
                  element.Reminder_ID == null ||
                  element.Reminder_ID == ''
                ) {
                  errMessage = { Error: `Reminder_ID is not valid!` };
                  isValid = false;
                }
              } else {
                errMessage = {
                  Error: `There is no Name or User_ID or Reminder_ID property on the ${table} object`,
                };
                isValid = false;
              }
            } else {
              errMessage = { Error: `There is more than three property on the object!` };
              isValid = false;
            }
          });
          if (isValid) {
            return true;
          } else return errMessage;

        case 'todoitem':
          request.body[table].forEach(element => {
            if (Object.keys(element)[2] === undefined) {
              if (element.hasOwnProperty('Description') && element.hasOwnProperty('List_ID')) {
                if (
                  typeof element.Description !== 'string' ||
                  element.Description == undefined ||
                  element.Description == null ||
                  element.Description == ''
                ) {
                  errMessage = { Error: `Description is not valid!` };
                  isValid = false;
                }
                if (
                  typeof element.List_ID !== 'number' ||
                  element.List_ID == undefined ||
                  element.List_ID == null ||
                  element.List_ID == ''
                ) {
                  errMessage = { Error: `List_ID is not valid!` };
                  isValid = false;
                }
              } else {
                errMessage = {
                  Error: `There is no Description or List_ID property on the ${table} object`,
                };
                isValid = false;
              }
            } else {
              errMessage = { Error: `There is more than two property on the object!` };
              isValid = false;
            }
          });
          if (isValid) {
            return true;
          } else return errMessage;

        case 'reminder':
          request.body[table].forEach(element => {
            if (Object.keys(element)[3] === undefined) {
              if (
                element.hasOwnProperty('Date') &&
                element.hasOwnProperty('Notification') &&
                element.hasOwnProperty('List_ID')
              ) {
                if (
                  element.Date == undefined ||
                  isTimestamp(Date.parse(element.Date)) == false ||
                  element.Date == null ||
                  element.Date == ''
                ) {
                  errMessage = { Error: `Date is not valid!` };
                  isValid = false;
                }
                if (
                  element.Notification == undefined ||
                  typeof element.Notification !== 'string' ||
                  element.Notification == null ||
                  element.Notification == ''
                ) {
                  errMessage = { Error: `Notification is not valid!` };
                  isValid = false;
                }
                if (
                  element.List_ID == undefined ||
                  typeof element.List_ID !== 'number' ||
                  element.List_ID == null ||
                  element.List_ID == ''
                ) {
                  errMessage = { Error: `List_ID is not valid!` };
                  isValid = false;
                }
              } else {
                errMessage = {
                  Error: `There is no Date or Notification or List_ID property on the ${table} object`,
                };
                isValid = false;
              }
            } else {
              errMessage = { Error: `There is more than three property on the object!` };
              isValid = false;
            }
          });
          if (isValid) {
            return true;
          } else return errMessage;

        case 'tag':
          request.body[table].forEach(element => {
            if (Object.keys(element)[2] === undefined) {
              if (element.hasOwnProperty('Name') && element.hasOwnProperty('Item_ID')) {
                if (
                  typeof element.Name !== 'string' ||
                  element.Name == undefined ||
                  element.Name == null ||
                  element.Name == ''
                ) {
                  errMessage = { Error: `Name is not valid!` };
                  isValid = false;
                }
                if (
                  typeof element.Item_ID !== 'number' ||
                  element.Item_ID == undefined ||
                  element.Item_ID == null ||
                  element.Item_ID == ''
                ) {
                  errMessage = { Error: `Item_ID is not valid!` };
                  isValid = false;
                }
              } else {
                errMessage = {
                  Error: `There is no Name or Item_ID property on the ${table} object`,
                };
                isValid = false;
              }
            } else {
              errMessage = { Error: `There is more than two property on the object!` };
              isValid = false;
            }
          });
          if (isValid) {
            return true;
          } else return errMessage;

        case 'listitem':
          request.body[table].forEach(element => {
            if (Object.keys(element)[3] === undefined) {
              if (
                element.hasOwnProperty('List_ID') &&
                element.hasOwnProperty('Item_ID') &&
                element.hasOwnProperty('IsCompleted')
              ) {
                if (
                  element.List_ID == undefined ||
                  typeof element.List_ID !== 'number' ||
                  element.List_ID == null ||
                  element.List_ID == ''
                ) {
                  errMessage = { Error: `List_ID is not valid!` };
                  isValid = false;
                }
                if (
                  element.Item_ID == undefined ||
                  typeof element.Item_ID !== 'number' ||
                  element.Item_ID == null ||
                  element.Item_ID == ''
                ) {
                  errMessage = { Error: `Item_ID is not valid!` };
                  isValid = false;
                }
                if (
                  element.IsCompleted == undefined ||
                  typeof element.IsCompleted !== 'string' ||
                  element.IsCompleted == null ||
                  element.IsCompleted == ''
                ) {
                  errMessage = { Error: `IsCompleted is not valid!` };
                  isValid = false;
                }
              } else {
                errMessage = {
                  Error: `There is no List_ID or Item_ID or IsCompleted property on the ${table} object`,
                };
                isValid = false;
              }
            } else {
              errMessage = { Error: `There is more than three property on the object!` };
              isValid = false;
            }
          });
          if (isValid) {
            return true;
          } else return errMessage;

        default:
          return { Error: `There is no such ${table} property` };
      }
    } else return { Error: 'content-type is not application/json' };
  } catch (error) {
    return { error: `${error.message}` };
  }
}

module.exports = {
  isInputValid,
};
