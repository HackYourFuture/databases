"use strict";

const checkAuth = require('../../author/check');
const validateEntries = require('../../config/validate');
const db = require('../../config/db-config');
const express = require('express');
const router = express.Router();

router.get('/', checkAuth, (req, res, next) => {
    findData(req.userData.userId)
      .then(data => {
          if(data.length < 1) return res.status(301).json({message: 'There are no items for this user yet!'});
          else {
              const currentUserMsg = 'This item for ' + req.userData.username;
              const obj = {};
              obj[currentUserMsg] = data;
              return res.status(200).json(obj);
          }
      })
      .catch(err => res.status(500).json({error: err}));
});

router.post('/add',checkAuth, (req, res, next) => {
    const todoItem = {
        task: req.body.task,
        done: req.body.done
    };
    const {error} = validateEntries(todoItem);
    if(error) return res.status(400).json({errorMessage: error.details[0].message});
    else {
        todoItem.user_id = req.userData.userId;
        const addItemQr = "INSERT INTO items (task, done, user_id) VALUES(?, ?, ?)";
        db.query(addItemQr, [todoItem.task, todoItem.done, todoItem.user_id], (err, results, fields) => {
            if(err) throw err;
            else return res.status(200).json({message: 'new item added to user' + req.userData.username});
        });
    }
});

router.delete('/delete/:id',checkAuth, (req, res, next) => {
    const itemId = req.params.id;
    const delItemQr = "DELETE FROM items WHERE user_id = ? AND id=?";
    db.query(delItemQr, [req.userData.userId, itemId], (err, results, fields) => {
        if(err) throw err;
        else {
            if(results.affectedRows < 1) return res.status(400).json({Error: 'invalid id not found!'});
            else return res.status(200).json({message: 'item deleted from user ' + req.userData.username});
        }
    });
});

router.put('/update/:id', checkAuth, (req, res, next) => {
    const itemId = req.params.id;
    const todoItem = {
        task: req.body.task,
        done: req.body.done
    };
    const {error} = validateEntries(todoItem);
    if(error) return res.status(400).json({errorMessage: error.details[0].message});
    const updateItemQr = "UPDATE items SET task = ?, done =? WHERE user_id = ? AND id=?";
    db.query(updateItemQr, [todoItem.task, todoItem.done, req.userData.userId, itemId], (err, results, fields) => {
        if(err) throw err;
        else {
            if(results.affectedRows < 1) return res.status(400).json({Error: 'invalid id'});
            else return res.status(200).json({message: 'item updated from user ' + req.userData.username, new: todoItem});
        }
    });
});

// retrieve data to check it
function findData(userId) {
    return new Promise ((resolve, reject) => {
        const query = "SELECT id, task, done FROM items WHERE user_id =?";
        db.query(query, [userId], (err, results, fields) => {
            if(!err) resolve(results);
            else reject(err);
        });
    });
}

module.exports = router;