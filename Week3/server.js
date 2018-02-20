"use strict";

const User = require("./models/users");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json()); 

app.post("/login", (req, res) => {

    const loginEmail = req.body.user.email;
    const loginPassword = req.body.user.password;

    // check that email and password valid on user login
    User.findOne({ email: loginEmail }, async function (err, result) {
        if (err) {
            res.status(400).send("Incorrect email. Please try again");
        }
        else {
            let dbPassword = result.password;
            const match = await bcrypt.compare(loginPassword, dbPassword);

            if (!match) {
                res.status(400).send("Incorrect password. Please try again");
            }
            else {
                res.status(200).send("Login successful!");
            }   
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

