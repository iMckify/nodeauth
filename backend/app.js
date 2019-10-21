const express = require('express'); // framework for MVC, manages Routing, handles Requests and Views
const mongoose = require('mongoose'); // ODM(maps obj to Document DB like Mongo), connects NODE <-> MongoDB
const bodyParser = require('body-parser'); // manages HTTP body
const passport = require('passport'); // auth middleware
const DBconfig = require('./db').DB; // require() = import statement in React
const cors = require('cors');


const users = require('./routes/userActions'); 

mongoose.connect(DBconfig, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const app = express(); // initiates express app
// passport.initialize()- MIDDLEWARE that initialises Passport
// Middlewares are functions that have access to the request object (req), the response
// object (res), and the next middleware function in the application’s request-response cycle
app.use(passport.initialize());

app.use(cors());
// CORS no lib
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization"); // adding "authorization" creates new keep alive http request with error
//     next();
// })

// puts passport.js config into passport middleware
require('./passport')(passport);


// .use() method in express is called a middleware.
// adding middleware between brackets to app object.
// bodyParser is executed on every request
app.use(bodyParser.urlencoded({ extended: false })); // selects algorythm for parsing
app.use(bodyParser.json()); // bodyParser.json returns middleware that only parses json

// app.use([path,] callback [, callback...]), where 
//  callback: (array of) middleware functions
// mounts callback functions at the specified path
app.use('/api/user', users);

// GET requests handler
app.get('/', function(req, res) {
    res.send('hello');
});

const PORT = process.env.PORT || 5000;

//listens for connections on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});