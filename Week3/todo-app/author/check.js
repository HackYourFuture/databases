"use strict";

const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    }
    catch(error) {
        res.status(401).json({ErroMessage: 'Authorization token failed'});
    }
};