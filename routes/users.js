const express = require('express')
const router = express.Router()
const User = require('../models/schemas')
const jwt = require('jsonwebtoken')
const cfg = require('../configs/dbconfig')


router.post('/register', (req, res, next) => {

    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    User.func.addUser(newUser, (err, user) =>{

        if(err) {
            res.json({success: false, msg: 'Registration failed'})
            console.log(err)
        }else{
            res.json({success: true, msg: 'Registration success'})
        }
    });
});

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    User.func.getUserByUsername(username, (err, res) =>{
        if(err) throw err;

        if(!res){
            res.json({success: false, msg: 'User not found.'})
        }

        User.func.matchUserPassword(password, res.password, (err, res) =>{
            if(err) throw err;
            if(!res){
                res.json({success: false, msg: 'Passwords didnt match'});
                return;
            }else{
                //TODO add callback here?
                const token = jwt.sign(user, cfg.secret, {expiresIn: null})
            }



        })
    });
});



router.get('/stuff', (req, res, next) => {
    res.send('stuff')
});

//



module.exports = router
