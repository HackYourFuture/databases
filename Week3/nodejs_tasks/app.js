const express = require('express');
const app = express();

const mysql = require('mysql');
const myConnection = require('express-myconnection');
const config = require('./config');
const dbOptions = {
    host: config.databases.host,
    user:config.databases.user,
    password: config.databases.password,
    port: config.databases.port,
    databases: config.databases.db
}
app.use(myConnection(mysql, dbOptions, 'pool'));
app.set('view engine', 'ejs');
const index = require('./router/index');
const tasks = require('./routes/tasks');
const expressValidator = require('express-validator');
app.use(bodyParser.urlencoded({extended: true}));

const methodOverride = require('method-override');
app.use(methodOverride((req, res) => {
    if(req.body && typeof req.body == 'object' && '_method' in req.body) {
        const method = req.body._method;
        delete req.body._method
        return method;
    }
}))

app.use('/', index);
app.use('/tasks', tasks);
app.listen(3000, () => {
    console.log("Sever port : 3000")
})