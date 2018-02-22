"use strict";

const User = require("./models/users");
const jwt_secret = require("./secret-config");

const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");


passport.use(new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: jwt_secret
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
        
    } catch(err) {
        done(err, false);
    }
}));

module.exports = passport;

