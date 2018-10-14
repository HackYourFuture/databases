const express = require('express');
const app = express();

app.get('/',(req,res,next)=>{
    req.getConnection((err,connection)=>{
        connection.query("SELECT * FROM todo_items ORDER BY id DESC",(err,results,fields)=>{
            if(err){
                req.status(500).json({code:'tableListingFailed',message:'Error during table listing'})
            }else{
                res.render('task/list',{code:'Task List',data:results});
            }
        });
    });
});
app.get('/add',(req,res,next)=>{
    res.render('task/add',{code:'New Task Added',task_name:''})
});
app.post('/add', (req,res,next)=>{
    req.assert('task_name','Task Name is required').notEmpty()
    const errors = req.validationErrors()
    if(!error){
        const task = {task_name:req.sanitize('task_name').escape().trim()} 
        req.getConnection(function(err,connection){
            connection.query("INSERT INTO todo_items SET ? ",task, function(err,results){
               if(err){
                req.flash("ERROR",err)
                res.render('task/add',{code:'NewTaskAdditionFailed',message:'Error during new task addition'})
                }else{
                req.flash('Succesfully Added');
                res.render('task/add',{code:'NewUserAddition',task_name:''})
                }
            })            
        })
    }else{
        const err_message ='';
        errors.forEach(function(error){
            err_message += err_message + '<br/>';
        });
        req.flash('Error', err_message)
        res.render('user/add',{code:'NewUserAddition',task_name:req.body.task_name});
    };      
});
app.get('/edit/(:id)',function(req,res,next){
    req.getConnection((err,connection)=>{
        const taskId = req.params.id;
        connection.query("SELECT * FROM todo_items WHERE id=?",[taskId],(err,results,fields)=>{
            if(err){
                req.status(500).json({code:'TaskEditingFailure',message:'Error during task edition'}) 
            };
            if(results.lenght === 0){
                req.flash('Error',`Task with ${taskId} is not exist`)
                res.redirect('/tasks')
            }else{
                res.render('task/edit',{code:'TaskEdition',id:results[0].id,task_name:results[0].task_name});
            };
        });
    });
});
app.put('/edit/(:id)',(req,res,next)=>{
    req.assert('task_name','Name is required').notEmpty()
    const errors = req.validationErrors()
    const taskId = req.params.id
    const taskName= req.body.task_name
    if(!errors){
        const task ={
            task_name : req.sanitize('task_name').escape().trim()
        }
        req.getConnection((err,connection)=>{
            connection.query("UPDATE todo_items SET ? WHERE  id= ?"+ taskId,task,(err,results)=>{
                if(err){
                    req.flash('Error',err)
                    res.render('task/edit',{code:'TaskEdition',id:taskId,task_name:taskName})
                }else{
                    req.flash('Succes','Task is updated succesfully')
                    res.render('task/edit',{code:'TaskEdition',id:taskId,task_name:taskName})
                }
            });
        });
    }else{
        const err_message ='';
        errors.forEach(function(error){
            err_message += err_message + '<br/>';
        });
        req.flash('Error', err_message)
        res.render('task/edit',{code:'TaskEdition',id:taskId,task_name:taskName});    
    }
});
app.delete('/delete/(:id)',(req,res,next)=>{
    const task ={id:req.params.id}
    req.getConnection(function(err,connection){
        connection.query("DELETE FROM todo_items WHERE id=? "+req.params.id, user,(err,results)=>{
            if(err){
                req.flash('Error',err)
                req.redirect('/tasks')
            }else{
                req.flash('Success','Task Deleted')
                res.redirect('/tasks')
            }
        });
    });
});
module.exports = app