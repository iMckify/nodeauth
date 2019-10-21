const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateLoginInput = require('../validation/login');
const User = require('../models/User');
const passwordValidation = require('../validation/password');

// register
router.post('', function(req, res) {
    const userData = req.body;

    User.findOne({
        email: userData.email  // Document.email: req.body.email
    }).then(user => { // responds with user when it is found
        if(user) {
            return res.status(400).json({
                "Status": res.statusCode,
                "Message": "Email already exists"
            });
        }
        else {
            const newUser = new User({
                email: userData.email,
                password: userData.password,
            });
            
            newUser
                .save() // updates document
                .then(user => { // .then() returns Promise (resolved obj value or reason that it's not resolved)
                    res.json(user) // this .then() function only returns resolved Document
                }); 
        }
    })
});

router.post('/login', (req, res) => {

    const { error, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(error);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user) {
                error = 'User not found'
                return res.status(404).json({
                    "Status": res.status,
                    "Message": error
                });
            }
            if(passwordValidation(user.password,password) == '') { // password is correct
                const payload = {
                    id: user.id
                }
                jwt.sign(payload, 'secret', { // puts user.id(payload) into JWT
                    expiresIn: 3600 // 1 hour
                }, (err, token) => { // callback arrow to handle error
                    if(err) console.error('There is some error in token', err);
                    else { // if payload is put into JWT successfully
                        res.send(token); //res.json({success: true,token: token});
                    }
                });
            }
            else {
                error = passwordValidation(user.password,password);
                return res.status(400).json({
                    "Status": res.status,
                    "Message": error
                });
            }
        });
});
//                   !!! Session
// authenticate(strategy, options: passport.AuthenticateOptions, callback?)
router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        email: req.user.email
    });
});

router.get('/:email', (req, res) => {

    User.findOne({ // finds with email
        email: req.params.email // err yra!!!! consolej ziuret po sign up
    }, function(err, data){
        if(err) {
            return res.status(400).json({
                "Status": res.statusCode,
                "Message": "Unexpected error"
            });
        } else if (!data){
            return res.status(404).json({
                "Status": res.statusCode,
                "Message": "User not found"
            });
        } else {
            return res.status(200).json({
                _id: data._id,
                email: data.email
            });
        }
    });
});

module.exports = router;