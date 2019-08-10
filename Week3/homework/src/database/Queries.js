class Queries {
  constructor(table) {
    this.table = table;
  }

  /**
   * All CRUD and custom queries was collected in this file
   * The queries are functions in order to be used dynamically for any table
   */

  crudQueries = {
    selectAll: () => `SELECT * FROM ${this.table}`,

    selectOne: () => `SELECT * FROM ${this.table} WHERE id = ?`,

    /**
     * @param {string} columns
     *  Custom column names of row which is going to be created
     */
    insert: (...columns) => `INSERT INTO ${this.table} (${columns.join(', ')}) VALUES (?)`,

    /**
     * @param {string} columns
     *  Custom column names of row which is going to be updated
     */
    update: columns => {
      const sets = columns.map(column => `${column} = ?`);
      return `UPDATE ${this.table} SET ${sets.join(', ')} WHERE id = ?`;
    },

    deleteOne: () => `DELETE FROM ${this.table} WHERE id = ?`
  };

  userQueries = {
    selectUserTodos: () => `
      SELECT t.title, t.description, l.is_done, l.deadline, t.tags, l.remind_date FROM todo_lists AS l
      LEFT JOIN users AS u
        ON l.user_id = u.id 
      LEFT JOIN todos AS t
        ON l.todo_id = t.id
      WHERE u.id = ?;
    `,
    selectDetailedUsers: () => `
      SELECT u.id, u.name, u.surname, u.email, t.title, t.description, t.tags, c.title, l.is_done, l.deadline, l.remind_date
      FROM todo_lists AS l
      LEFT JOIN users AS u ON u.id = l.user_id
      LEFT JOIN todos AS t ON t.id = l.todo_id
      LEFT JOIN categories AS c ON c.id = l.category_id
    `
  };

  todoListQueries = {
    /**
     * @param {string} status
     *  Set list item as 'done' or 'undone' in TODO_LIST table
     */
    updateDone: status => `UPDATE todo_lists SET is_done = ${status} WHERE id = ?;`
  };
}

module.exports = Queries;
