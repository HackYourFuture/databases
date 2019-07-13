const express = require ('express');
const routes = express();
const bodyParser = require ('body-parser');
const queries = require ('./queries.js');

//routes.use(bodyParser.urlencoded({extended: true}));
routes.use(bodyParser.json());

routes.get('/tables', function(req, res) {
    queries.tables(req.params.tables);
    res.status(200);
    res.send('tables are showed!!!');
});

routes.post('/createuser', function(req, res) {
    queries.createUser(req.body.id, req.body.user_name);
    res.status(200);
    res.send('user created!!');
});

routes.post('/createtodo', function(req, res) {
    queries.createTodoList(req.body.id, req.body.todo_name, req.body.user_id);
    res.status(200);
    res.send('todo created!!');
});

routes.post('/createitem', function(req, res) {
    queries.createItem(req.body.id, req.body.item_desc, req.body.todo_id, req.body.done);
    res.status(200);
    res.send('item created!!');
});

routes.delete('/deleteitem/:id', function(req, res) {
    queries.deleteItem(req.params.id);
    res.status(200);
    res.send('item is deleted!!');
});

routes.delete('/deletetodo/:id', function(req, res) {
    queries.deleteTodoList(req.params.id);
    res.status(200);
    res.send('todo list deleted!!');
});

routes.post('/createreminder', function(req, res) {
    queries.createReminder(req.body.id, req.body.todo_id,  req.body.time_reminder);
    res.status(200);
    res.send('reminder created!!');
});




routes.listen(3000, function() {
    console.log('server is listening on port...!!!')
});