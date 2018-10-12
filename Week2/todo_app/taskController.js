const connection = require('./db').connection;
module.exports ={

    createTask: function(req,res){
        //accesing request body
        const reqData = req.body;  
        //if task message is not available     
        if (!reqData.text){
            return res.status(400).json({code:'taskCreationFailed', message : 'task description is not present'})
        }
        if (!reqData.is_done ){
            return res.status(400).json({code:'taskCreationFailed', message : 'is_done is not present '})
        }
        const taskData = {
            text : reqData.text,
            is_completed:reqData.is_completed,
            user_id: reqData.user_id
        }
        connection.query("INSERT INTO todo_items SET ?", taskData,function(err, result, fields){
            if(err){
                console.log(err);
                return res.status(500).json({code:"taskCreationFailed", message:"error occured while posting"})
            }
            return res.status(200).json({code:"taskCreated",message:"new todo item has been succesfully created"})
        });
    },
    getTask : function(req,res){
        connection.query("SELECT * FROM todo_items", function(err, results, fields){
            if (err){
                console.log(err)
                return res.status(500).json({code:"taskNotFound", message:"Error occured during the get all items of todo_items"});
            }
            return res.status(200).json({code:"taskFound", data: results, message: "All items have been succesfully fetched"})
        })
    },
    getTaskByID : function (req, res){
        const taskId =  req.params.taskId;
        connection.query("SELECT * FROM todo_items where id = ?", [taskId], function (err,results,fields){
            if (err){
                console.log(err);
                return res.status(500).json({code:"taskNotFound", message:"Error occured during the getting task by id"})
            }
            if(results.length === 0){
                return res.status(404).json({code:"taskNotFound", message:"The requested task was not found"})
            }
            return res.status(200).json({code:"TaskFound", data:results})
        })
    },
    upDateTask : function(req, res){
        //accesing task ID
        const taskId = req.params.taskId;
        //request data
        const reqData = req.body;
        if (!reqData.text){
            return res.status(400).json({code:'taskUpdateFailed', message : 'Taks description is'})
        }
        if (!reqData.is_done ){
            return res.status(400).json({code:'taskCreationFailed', message : 'is_done is not present or not boolean'})

        }
        connection.query("SELECT * FROM todo_items WHERE id=?", [taskId], function(err, results, fields){
            if (err){
                return res.status(500).json({code:"taskUpdateFailed", message:"Error occured during the task update to fetch id"});
            }
            if(results.length === 0){
                return res.status(500).json({code:"taskUpdateFailed", message:"The requested task was not found"})
            }        
        });
        connection.query("UPDATE todo_items SET text=?, is_completed=?, user_id=? WHERE id = ?",[reqData.text, reqData.is_completed,reqData.is_completed,taskId],function(err,results,fields){
            if(err){
                return res.status(500).json({code:"taskUpdate Fail", message:"Error occured during the task update"});
            };
            res.status(200).json({code:"task updated"})
        })
    },
    deleteRow : function(req,res){
        const taskId = req.params.taskId;

        connection.query("SELECT * FROM todo_items WHERE id=?",[taskId], function(err, results,fields){
            if(err){
                console.log(err)
                return res.status(500).json({code:"taskDeleteFailed", message:"Error occured while finding the task"})
            }
            if(results.length === 0){
                return res.status(500).json({conde:"taskDeleteFailed",message:"no task with id exits"})
            }
            connection.query("DELETE FROM todo_items WHERE id=?",[taskId], function(err, results, fields){
                if(err){
                    console.log(err)
                    return res.status(500).json({code:"taskDeleteFailed", message:"Error occured while deleting the task"})
                }
                return res.status(200).json({code:"task deleted"})
            })
        })
    },
    tagTodoItem:function(req,res){
        const reqData = req.body;
        if(!reqData.todo_item_id){
            return res.status(400).json({code:'tagCreationFailed', message : 'Todo item id is not present'})
        }
        if(!reqData.tag_id){
            return res.status(400).json({code:'tagCreationFailed', message : 'Tag_id is not present '})
        }
        const tagData = {
            todo_item_id:reqData.todo_item_id,
            tag_id:reqData.tag_id
        }
        connection.query("INSERT INTO todo_item_tag SET ?", tagData,function(err, result, fields){
            if(err){
                console.log(err);
                return res.status(500).json({code:"taskCreationFailed", message:"error occured while posting"})
            }
            return res.status(200).json({code:"taskCreated",message:"New tag item has been succesfully created"})
        });
    },
    untagTodoItem:function(req,res){
        const tagId = req.params.tagId;
        connection.query("SELECT * FROM todo_item_tag WHERE todo_item_id=?",[tagId],(err,results,fields)=>{
            if (err){
                return res.status(500).json({code:"unTagFailed",message:"An error occuered while fetching id in untagging process"})
            }
            if(results.length===0){
                return res.status(500).json({code:"unTagFailed",message:"No tag with indicated Id"})
            }
        connection.query("DELETE FROM todo_item_tag WHERE todo_item_id=?"[tagId],(err,results,fields)=>{
            if (err){
                return res.status(500).json({code:"unTagFailed",message:"An error occuered while untagging process"})
            } 
            return res.status(200).json({code:"Untag has done"})
        })
        })
    }
   
};
    