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

const app = express();
app.use(passport.initialize());
app.use(cors());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/user', users);

app.get('/', function(req, res) {
    res.send('hello');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});