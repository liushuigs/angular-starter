module.exports = {
    "env": {
        "node": true
    },
    parserOptions: {
        sourceType: 'script',
        // If we wanted to use ES6 in our build scripts, we would have to run
        // our code through `babel-node`, which has a performance penalty.
        // To avoid that, we'll just write these scripts in ES5.
        ecmaVersion: 5
    }
}
