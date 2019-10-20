const passwordValidation = (db_password, password) => {
    if (password.length !== 0) {
        if (password !== db_password) {
        return 'Password is incorrect';
        }
    } else {
        return 'Password is empty';
    }
    return '';
};

module.exports = passwordValidation;