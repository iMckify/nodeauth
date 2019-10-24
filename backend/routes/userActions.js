const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateLoginInput = require('../validation/login');
const User = require('../models/User');
const passwordValidation = require('../validation/password');

router.post('', function(req, res) {
    const userData = req.body;

    User.findOne({
        email: userData.email
    }).then(user => {
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
                .save()
                .then(user => {
                    res.json(user)
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
                return res.status(404).json({
                    "Status": res.statusCode,
                    "Message": 'User not found (/login)'
                });
            }
            let l_error = passwordValidation(user.password,password);
            if(l_error == '') {
                const payload = {
                    id: user.id,
                    email: user.email
                }
                jwt.sign(payload, 'secret', {
                    expiresIn: 3600
                }, (err, token) => {
                    if(err) console.error('There is some error in token', err);
                    else {
                        res.send(token);
                    }
                });
            } else {
                return res.status(400).json({
                    "Status": res.statusCode,
                    "Message": l_error
                });
            }
        });
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        email: req.user.email
    });
});

// padariau del FE validateInfo(jwtDecode(res.data).email) in authentication.js
router.get('/:email', (req, res) => {

    User.findOne({ // finds with email
        email: req.params.email // err yra!!!! consolej ziuret po sign up
    }, function(err, data){ // function = projection, if not specified, all fields are returned
        if(err) {
            return res.status(400).json({
                "Status": res.statusCode,
                "Message": "Unexpected error"
            });
        } else if (!data){
            return res.status(404).json({
                "Status": res.statusCode,
                "Message": "User not found (/:email)"
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