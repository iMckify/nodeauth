const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data) {
    let error = {};
    data.email = !isEmpty(data.email) ? data.email : ''; // empty string option prevents from undefined, etc.
    data.password = !isEmpty(data.password) ? data.password : '';

    if(!Validator.isEmail(data.email)) {
        error = 'Email is invalid';
    }

    if(Validator.isEmpty(data.email)) {
        error = 'Email is required';
    }

    if(!Validator.isLength(data.password, {min: 8, max: 30})) {
        error = 'Password must have 8 chars';
    }

    if(Validator.isEmpty(data.password)) {
        error = 'Password is required';
    }

    return {
        error,
        isValid: isEmpty(error)
    }
}