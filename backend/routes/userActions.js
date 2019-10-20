const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const User = require('../models/User');
const passwordValidation = require('../validation/password');


router.post('/register', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ // finds with email
        email: req.body.email
    }).then(user => {
        if(user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
            const newUser = new User({
                email: req.body.email,
                password: req.body.password,
            });
            
            newUser
                .save() // updates document
                .then(user => { // .then() returns Promise (resolved obj value or reason that it's not resolved)
                    res.json(user) // this .then() function only returns resolved Document
                }); 
        }
    });
});

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
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
                        res.json({
                            success: true,
                            token: `Bearer ${token}`
                        });
                    }
                });
            }
            else {
                errors.password = passwordValidation(user.password,password);
                return res.status(400).json(errors);
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

module.exports = router;