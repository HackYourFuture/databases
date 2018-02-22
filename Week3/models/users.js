"use strict";

const mongoose = require("../util/connection");
const bcrypt = require("bcrypt");
const saltRounds = 9;

const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

// hash password+salt before saving to db

userSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;   
        next();
    } catch (err) {
        next(err);   
    }   
});

const User = mongoose.model("user", userSchema);

User.create({
    email: "bridgetjones@email.com",
    password: "pwd123"
}, err => {
    callback(err);
});

User.create({
    username: "jonnyP",
    email: "johnproctor@email.com",
    password: "pwd456"
}, err => {
    callback(err);
});

User.create({
    username: "freebird67",
    email: "norahelmer@email.com",
    password: "pwd789"
}, err => {
    callback(err);
});

function callback(error) {
    if (error) return console.error(error);
    console.log("User successfully saved");
}


module.exports = User;
