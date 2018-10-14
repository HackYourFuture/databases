const express = require('express');
const app = express();
const mysql = require('mysql');
const myconnection = require('express-myconnection');
const config = require('./config');
const dbOptions = {
    host : config.database.host,
    user:config.database.user,
    password:config.database.password,
    port:config.database.port,
    database:config.database.db
};

app.use(myconnection(mysql,dbOptions,'pool'));
app.set('view engine', 'ejs');
const index = require('./routes/index');
const tasks = require('./routes/tasks');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

const methodOverride = require('method-override');

app.use(methodOverride(function(req,res){
    if(req.body && typeof req.body == 'object' && '_method' in req.body){
        const method = req.body._method;
        delete req.body._method
        return method
    }
}));

const flash = require('express-flash');
const cokkieParser = require('cookie-parser');
const session = require('express-session');

app.use(cokkieParser('keyboard1'));
app.use(session({
    secret: 'keyboard1',
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:600000}
    
}))

app.use(flash());
app.use('/', index);
app.use('/tasks', tasks);

app.listen(5000, function(){
    console.log('Server port: 5000')
})