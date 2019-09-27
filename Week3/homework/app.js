'use strict';
const express = require('express');
const app = express();
const lists_routes = require('./api/routes/lists_routes');
const tasks_routes = require('./api/routes/tasks_routes');

app.use(express.json());

app.all('/', (req, res, next) => {
    res.status(201).json({
        message: 'welcome to ToDo lists app',
    });
});
app.use('/lists', lists_routes);
app.use('/tasks', tasks_routes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

module.exports = app;