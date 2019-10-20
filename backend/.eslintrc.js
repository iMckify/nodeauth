module.exports = {
    extends: ['airbnb', 'prettier'],
    parserOptions: {
        "ecmaVersion": 2018
    },
    env: {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': ['error']
    },
    globals: {
    }
};
