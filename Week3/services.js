const bcrypt = require('bcrypt');
const dbConnection = require('./config');

function register(res, users) {
    dbConnection.query('INSERT INTO users SET ?', users, (err, results, fields) => {
        if (err) {
            res.send("error", err);
        } else {
            res.send(`user registered successfully with id: ${results.insertId}`);
        }
    });
}

function login(user, pw, response) {
    dbConnection.query('SELECT * FROM users WHERE first_name = ?', [user], (err, results, fields) => {
        if (err) {
            response.json({ "error": err });
        } else {
            if (results.length > 0) {
                bcrypt.compare(pw, results[0].password, function (err, res) {
                    if (res == true) {
                        response.send(`welcome ${user}`);
                    } else { response.send('wrong user name or password!'); }
                });
            } else {
                response.send("User does not exits");
            }
        }
    });
}

function load(res) {
    dbConnection.query("SELECT * FROM todo_items", function (err, results, fields) {
        if (err) {
            res.send("Error", err);
        }
        res.json({ "Existing todo items": results });
    });
}

function create(text, todo_id, response) {
    dbConnection.query('INSERT INTO todo_items SET ?', { text: text, user_id: 1, todo_id: todo_id }, function (err, results, fields) {
        if (err) {
            response.json({ "Error": err });
        }
        response.send(`item inserted with the id": ${results.insertId}`);
    });
}

function update(id, text, response) {
    dbConnection.query('UPDATE todo_items SET text = ? WHERE todo_id = ?', [text, id], function (err, results, fields) {
        if (err) {
            response.json({ "Error": err });
        }
        response.send(`rows updated: ${results.affectedRows}`);
    });
}

function deleteRow(todo_id, response) {
    dbConnection.query('DELETE FROM todo_items WHERE todo_id = ?', [todo_id], function (err, results, fields) {
        if (err) {
            response.json({ "Error": err });
        }
        response.send(`rows deleted: ${results.affectedRows}`);
    });
}

function markCompleted(todo_id, response) {
    dbConnection.query('UPDATE todo_items SET is_completed = ? WHERE todo_id = ?', [1, todo_id], function (err, results, fields) {
        if (err) {
            response.json({ "Error": err });
        }
        response.send(`number of updated rows: ${results.affectedRows}`);
    });
}

module.exports = {
    register,
    login,
    load,
    create,
    update,
    deleteRow,
    markCompleted
};