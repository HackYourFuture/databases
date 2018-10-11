var connection = require('./lib/database.js').connection;
module.exports = {
  createTask: function (req, resp) {
    var requestData = req.body;
    console.log(requestData);
    if (!requestData.text) {
      return resp.status(400).json({ code: 'Task creation failed', message: 'task message not available' })
    }
    var taskData = {
      text: requestData.text,
      is_completed,
      user_id: requestData.user_id
    }
    connection.query('INSERT INTO todo_items SET ?', taskData, function (error, result, fields) {
      if (error) {
        console.log(error)
        return resp.status(500).json({ code: 'TaskCreation failed', message: "Error occurred while creating record" })
      }
      return resp.status(200).json({ code: 'TaskCreated', message: 'Task has been created' })
    })
  },

  getTask: function (req, resp) {
    connection.query('SELECT * FROM todo_items', function (error, result, fields) {
      if (error) {
        console.log(error)
        return resp.status(500).json({ code: 'taskNotfound', message: 'Error occurred while getting tasks' })
      }
      return resp.status(200).json({ code: "Task found", data: result })
    })
  },
  getTaskById: function (req, resp) {
    var taskId = req.params.taskId;
    connection.query('SELECT * FROM todo_items WHERE id = ?', [taskId], function (error, result, fields) {
      if (error) {
        console.log(error)
        return resp.status(500).json({ code: 'Task not found', message: 'Error occurred while finding task by id in database' })
      }
      if (!result.length === 0) {
        return resp.status(404).json({ code: 'Task not found', message: 'Task by this id is not presented in database' })
      }
      return resp.status(200).json({ code: 'Task found', data: result })
    })
  },

  updateTaskById: function (req, resp) {
    var taskId = req.params.taskId;
    var requestData = req.body;
    if (!requestData.text) {
      resp.status(400).json({ code: 'TaskUpdateFailed', message: 'Text is not available in the body' })
    }
    connection.query('SELECT FROM todo_items WHERE id = ?', [taskId], function (error, result, fields) {
      if (error) {
        return resp.status(500).json({ code: 'TaskUpdateFailed', message: 'Error occurred while accessing database' });
      }
      if (result.length === 0) {
        return resp.status(500).json({ code: 'TaskUpdateFailed', message: "No record with this id" })
      }
      connection.query('UPDATE todo_items SET text = ?, is_completed = ? WHERE id = ?', [requestData.text, requestData.is_completed, taskId], function (eror, result, fields) {
        if (error) {
          return resp.status(500).json({ code: 'TaskUpdateFailed', message: 'Error occurred while updating the task' });
        }
        resp.status(200).json({ code: 'TaskUpdated' })
      })
    })
  },
  deleteTaskById: function (req, resp) {
    var taskId = req.params.taskId;
    connection.query('SELECT FROM todo_items WHERE id = ?', [taskId], function (error, result, fields) {
      if (error) {
        return resp.status(500).json({ code: 'TaskDeleteFailed', message: 'Error occurred while accessing database' });
      }
      if (result.length === 0) {
        return resp.status(500).json({ code: 'TaskDeleteFailed', message: "No record with this id exists in database" })
      }
      connection.query('DELETE FROM todo_items WHERE id = ?', [taskId], function (error, result, fields) {
        if (error) {
          return resp.status(500).json({ code: 'TaskDeleteFailed', message: 'Error occurred while deleting the record' })
        }
        return resp.status(200).json({ code: 'TaskDeleted' })
      })
    })
  }
}
