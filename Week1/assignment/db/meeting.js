import db from '../util/dbConnection.js';

function createMeeting(meeting) {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO Meeting SET ?', meeting, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function getMeeting(meeting_no) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM Meeting WHERE meeting_no = ?',
      meeting_no,
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

export { createMeeting, getMeeting };
