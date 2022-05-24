const express = require('express');
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongo_config = require('./configs/dbconfig')
const users = require('./routes/users')
const data = require('./routes/products')
const passport = require('passport')
const session = require('express-session')
const cfg = require("./configs/alkodbconfig");
const History = require("./models/historysubschema");
const Datedata = require("./models/history");



const app = express();
const port = 3000;

//MongoDB block, might be moved
mongoose.connect(mongo_config.database);
mongoose.connection.on('connected', () =>{
   console.log(mongo_config.database)
});

//console.log(conn); // => results


//TODO what is this?
app.use(session({
    secret: "TEMPORARY",
    resave: false,
    saveUninitialized: true
}));
app.use(cors());

app.use(passport.initialize());
app.use(passport.session())


require('./configs/passportconfig')(passport)


app.use(express.static(path.join(__dirname, '/client')))
app.use(bodyParser.json())
app.use('/users', users)
app.use('/data', data)


app.get('/', (req, res) =>{
    res.send("Invalid endpoint")
});

app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname + '/client/index.html'))
})

app.listen (port, () =>{
    console.log('Server started on ' + port)
});

function populateSearchFunction(){
    Datedata.find()
        .populate({
            path: 'products',
            model: History,
            match: { productName: 'Jameson', bottleSize: '0,7 l'},
        })
        .exec(function (err, x){
            if (err) throw err;
            console.log(x[0])
        });
}

//populateSearchFunction()
