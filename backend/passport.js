const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');


//=======> passport.js config to extract JWT from auth header as Bearer and 
//=======> return token if the user is logged in for the client to use


// control how token is extracted from the request or verified
const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // jwtFromRequest extracts JWT string or null from request
    secretOrKey: 'secret' // secretOrKeyreturns secret string verifying the token's signature 
};

// jwt_payload is an object literal containing the decoded JWT payload
// done is a passport error first callback accepting arguments done(error, user, info)
// verify function purpose is to find the user that possesses required credentials
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

// exports arrow with passport argument/parameter which is initialized in app.js
module.exports = passport => {
    passport.use(new JWTStrategy(options, (jwt_payload, done) => verify(jwt_payload,done)));
}