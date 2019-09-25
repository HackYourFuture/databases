const express = require('express');
const app = express();
const lists_routes = require('./api/routes/lists_routes');
const tasks_routes = require('./api/routes/tasks_routes');

app.all('/', (req, res, next) => {
    res.status(201).json({
        message: 'welcome to ToDo lists app',
    });
});
app.use('/lists', lists_routes);
app.use('/tasks', tasks_routes);

module.exports = app;