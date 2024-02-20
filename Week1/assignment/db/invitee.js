import db from '../util/dbConnection.js';

function createInvitee(invitee) {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO Invitee SET ?', invitee, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function getInvitee(invitee_no) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM Invitee WHERE invitee_no = ?',
      invitee_no,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

export { createInvitee, getInvitee };
