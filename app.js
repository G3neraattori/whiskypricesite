const express = require('express');
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongo_config = require('./configs/dbconfig')
const users = require('./routes/users')
const passport = require('passport')


const app = express();
const port = 3000;

//MongoDB block, might be moved
mongoose.connect(mongo_config.database);
mongoose.connection.on('connected', () =>{
   console.log(mongo_config.database)
});

//TODO what is this?
app.use(cors());
app.use(passport.initialize());
app.use(passport.session())
require('./configs/passportconfig')(passport)

app.use(express.static(path.join(__dirname, 'client')))
app.use(bodyParser.json())
app.use('/users', users)

app.get('/', (req, res) =>{
    res.send("Invalid endpoint")
});
app.post('/', (req, res) =>{
    res.send("Invalid endpoint")
});

app.listen (port, () =>{
    console.log('Server started on ' + port)
});

