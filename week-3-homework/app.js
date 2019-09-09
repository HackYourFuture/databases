const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const database = require('./modules/database');
const countryRepo = require('./modules/countryRepository');
const cityRepo = require('./modules/cityRepository');

const app = express();


// Middlewares - routing
// This tells node js to use pug as renderer of our websites
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true })); // ? % & encoded

// This allows to use public urls to show the images
app.use("/public", express.static(path.join(__dirname, 'public')));

app.use(require('./routes/country'));
app.use(require('./routes/user'));
app.use(require('./routes/city'));

app.get('/', function (request, response) {
    return response.redirect('/city');
});

app.listen(3000, function () {
    console.log('Running my server in 3000');
});