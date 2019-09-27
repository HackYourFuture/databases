const userQueries = [
  'SELECT * FROM users',
  'SELECT * FROM users WHERE id = ?',
  'DELETE FROM users WHERE id = ? ',
  'INSERT INTO users SET username = ?, email = ?',
  'UPDATE users SET username = ? WHERE id = ?',
];

const listQueries = [
  'SELECT * FROM list',
  'INSERT INTO list(list_name, user_id) VALUES(?,?)',
  'DELETE FROM list WHERE id = ?',
  "UPDATE list SET reminder = ? where id = ?",
  "INSERT INTO listItem(item_header, item_body,list_id) VALUES(?, ?, ?)",
  "SELECT * FROM listItem",
  "DELETE FROM listItem WHERE id IN (?)",
  "UPDATE listItem SET done = ? WHERE id = ?"
];

module.exports = { userQueries, listQueries };