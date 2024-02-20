import db from '../util/dbConnection.js';

function createRoom(room) {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO Room SET ?', room, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function getRoom(room_no) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Room WHERE room_no = ?', room_no, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export { createRoom, getRoom };
