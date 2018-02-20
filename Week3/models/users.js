"use strict";

const mongoose = require("../connection");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true }
});


// hash password+salt before saving to db
userSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(9);
        const passwordHash = await bcrypt.hash(this.password, salt);
        
        this.password = passwordHash;    
    } catch (err) {
        next(err);   
    }   
});

const User = mongoose.model("users", userSchema);

User.create({ email: "bridgetjones@email.com", password: "darcy123" }, err => {
    callback(err);
});

User.create({ email: "johnproctor@email.com", password: "salemsucks254"}, err => {
    callback(err);
});

User.create({ email: "norahelmer@email.com", password: "byetorvald67" }, err => {
    callback(err);
});

function callback(error) {
    if (error) return console.error(error);
    console.log("User successfully saved");
}


module.exports = User;
