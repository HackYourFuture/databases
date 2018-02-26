"use strict";

const passport = require("./util/passport");
const User = require("./models/users");
const jwt_secret = require("./util/secret-config");

const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

function signToken(user) {
    return jwt.sign({
        iss: "todo_app",
        sub: user._id,
        iat: new Date().getTime()
    }, jwt_secret);
}

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome. Please log in or sign up"
    });
});

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    // check if account already exists for signup email
    // add new user to db if not
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "An account already exists for that email"
        });
    }
    const newUser = new User({ email, password });
    await newUser.save();

    // send token to user
    const token = signToken(newUser);
    res.status(200).json({ token });
});


app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // check that login email and password match records
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        return res.status(400).json({
            success: false,
            message: "Incorrect email. Please try again"
        });
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
        return res.status(401).json({
            success: false,
            message: "Incorrect password. Please try again"
        });
    } 

    // send token to user
    const token = signToken(existingUser);
    res.status(200).json({ token });         
});


// check GET request headers for jwt sent to user at login/signup 
// allow access to app if token valid

app.get("/account", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.status(200).json({
        success: true,
        message: "access granted"
    });
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
