const express = require('express');
const bodyParser = require('body-parser');
const program = require('./program/program')
const app = express();
const port = 4050;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

program(app);

const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`${server.address().port}`);
});