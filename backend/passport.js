const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');

const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
};

const verify = (jwt_payload, done) => {
    User.findById(jwt_payload.id)
        .then(user => {
            if(user) {//    err
                return done(null, user);
            }
            return done(null, false);
        })
        .catch(err => console.error(err));
};

module.exports = passport => {
    passport.use(new JWTStrategy(options, (jwt_payload, done) => verify(jwt_payload,done)));
}