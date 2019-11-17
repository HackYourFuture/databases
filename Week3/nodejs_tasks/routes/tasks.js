const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
    req.getConnection((error, conn) => {
        conn.query("select * FROM tbl_tasks ORDER BY id DESC", (err, rows, fields) => {
            if (err) {
                req.flash('error', err)
                res.render('task/list', {
                    title: 'Task List',
                    data: ' '
                })
            }else{
                res.render('task/list', {
                    title:'Task List',
                    data:rows
                })
            }
        })
    })
})

app.get('/add', (req, res, next) => {
    res.render('task/add', {
        title:'Add New Task',
        task_name:' '
    })
})

app.post('/add', (req, res, next) => {
    req.assert('task_name', 'Name is required').noEmpty();

    let errors = req.validationErrors();

    if(!errors){
        let task = {
            task_name: req.sanitize('task_name').escape().trim()
        }

        req.getConnection((error, conn) => {
            conn.query("INSERT INTO tbl_tasks SET ? ", task, (err, result) => {
                if(err){
                    req.flash('error', err)
                    res.render('task/add', {
                        title: 'Add New Task',
                        task_name: task.task_name
                    })
                }else{
                    req.flash('success', 'Data Added successfully!');
                    res.render('task/add', {
                        title: 'Add  New User',
                        task_name: ' '
                    })
                }
            })
        })
    }else{
        let error_msg = '';
        errors.forEach((error) => {
            error_msg += error_msg + '<br/>'
        })

        req.flash('error', error_msg);
        res.render('user/add', {
            title: 'Add New User',
            task_name: req.body.task_name
        })
    }
})

app.get('/edit/(:id)', (req, res, next) => {
    req.getConnection((error, conn) => {
        conn.query("SELECT * FROM tbl_tasks WHERE id = " +
            req.params.id, (err, rows, fields) => {
                if(err) throw err
                if(rows.length <= 0) {
                    req.flash('error', 'User not found width id = ' + req.params.id)
                    res.redirect('/tasks')
                }else{
                    res.render('task/edit', {
                        title: 'Edit Task',
                        id: rows[0].id,
                        task_name: rows[0].task_name
                    })
                }
            })
    })
})

app.put('edit/(:/id)', (req, res, next) => {
    req.assert('task_name', 'Name is required').noEmpty()

    let errors = req.validationErrors();
    if(!errors){
        let task = {
            task_name: req.sanitize('task_name').escape().trim()
        }

        req.getConnection((error, conn) => {
            conn.query("UPDATE tbl_tasks SET ? WHERE id = " + req.params.id, task,
            (err, result) => {
                if(err){
                    req.flash('error', err)

                    res.render('task/edit', {
                        title: 'Edit Task',
                        id: req.params.id,
                        task_name:req.body.task_name
                    })
                }else{
                    req.flash('success', 'Data updated successfully.')
                    res.render('task/edit'), {
                        title: 'Edit Task',
                        id: req.params.id,
                        task_name: req.body.task_name
                    }
                }
            })
        })

    }else{
        let error_msg = ' ';
        errors.forEach((err) => {
            error_msg += error_msg + '<br/>';
        })
        req.flash('error', error_msg);
        res.render('task/edit', {
            title: 'Edit Task',
            id: req.params.id,
            name: req.body.task_name
        })
    }
})

app.delete('/delete/(:id)', (req, res, next) => {
    let task = {id : req.params.id};
    req.getConnection( (error, conn) => {
        conn.query("DELETE FROM tbl_tasks WHERE id = " + req.params.id, task,
        (err, result) => {
            if(err){
                req.flash('error', err);
                res.redirect('/task')
            }else{
                req.flash('success', 'Task Deleted successfully.');
                res.redirect('/task')
            }
        })
    })
})
module.exports = app;
