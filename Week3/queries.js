//SELECT QUERIES
const listsAndToDosByUserId = `SELECT lists.name, todos.description
FROM lists
INNER JOIN lists_todos ON lists.user_id = ? AND lists_todos.list_id = lists.id
LEFT JOIN todos ON lists_todos.todo_id= todos.id`;

const listsByUserId = `SELECT name
FROM lists JOIN users ON lists.user_id = users.id AND users.id = ?`;

const remindersByUserId = `SELECT name, reminder from lists 
WHERE user_id = ? AND reminder IS NOT NULL
`;

const allDoneToDosByUserId = `SELECT description FROM todos WHERE id IN (
  SELECT todo_id FROM lists_todos WHERE is_done = ? AND list_id IN(
    SELECT id FROM lists WHERE user_id = ?
  )
)`;

const s_Id_Todos_Desc = 'select id from todos where description = ?';
const s_lId_listsTodos_lIdTdId =
  'SELECT list_id FROM lists_todos WHERE list_id = ? AND todo_id = ? ';
const s_Id_users_uName = `SELECT id FROM users WHERE username = ?`;
const s_Id_lists_nameUId = `SELECT id FROM lists WHERE name = ? and user_id = ?`;
const s_todoId_listsTodos_lId = 'SELECT todo_id FROM lists_todos WHERE list_id = ?';
const s_lId_listsTodos_tId = 'SELECT list_id FROM lists_todos WHERE todo_id = ?';
const s_lId_listsTodos_TId = 'SELECT list_id FROM lists_todos WHERE todo_id = ?';

//INSERT QUERIES
const i_listsTodos_S = 'INSERT INTO lists_todos SET ?';
const i_todos_S = 'insert into todos set ? ';
const i_lists_S = 'INSERT INTO lists SET ?';
//DELETE QUERIES
const d_listsTodos_lId = 'DELETE FROM lists_todos WHERE list_id = ?';
const d_listsTodos_lIdTId = 'DELETE FROM lists_todos WHERE list_id = ? AND todo_id = ?';
const d_todos_Id = 'DELETE FROM todos WHERE id =?';
const d_lists_Id = 'DELETE FROM lists WHERE id = ?';
//UPDATE QUERIES
const u_listsTodos_tIdLId = 'UPDATE lists_todos SET is_done = 1 WHERE todo_id = ? AND list_id = ?';
const u_listsTodos_reminder_tIdLId = 'UPDATE lists SET reminder = ? WHERE id = ?';
module.exports = {
  listsByUserId,
  listsAndToDosByUserId,
  allDoneToDosByUserId,
  remindersByUserId,
  s_Id_Todos_Desc,
  s_lId_listsTodos_lIdTdId,
  s_lId_listsTodos_TId,
  s_Id_users_uName,
  s_Id_lists_nameUId,
  s_todoId_listsTodos_lId,
  s_lId_listsTodos_tId,
  i_todos_S,
  i_listsTodos_S,
  i_lists_S,
  d_listsTodos_lId,
  d_todos_Id,
  d_lists_Id,
  d_listsTodos_lIdTId,
  u_listsTodos_tIdLId,
  u_listsTodos_reminder_tIdLId,
};
