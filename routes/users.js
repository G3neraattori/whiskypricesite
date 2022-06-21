const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/schemas')
const jwt = require('jsonwebtoken')
const cfg = require('../configs/dbconfig')


router.post('/register', (req, res, next) => {

    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    //console.log('newUser: ' + newUser)
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
    console.log('WE ARE 2 HERE')

    User.func.getUserByUsername(username, (err, user) =>{
        if(err) throw err;
        //console.log(!user)
        if(!user){
            res.json({success: false, msg: 'User not found.'})
            return;
        }

        User.func.compareUserPassword(password, user.password, (err, result) =>{
            if(err) throw err;
            if(!result){
                res.json({success: false, msg: 'Passwords didnt match'});
                return;
            }else{
                //TODO add callback here? although needs refactoring then in multiple files
                const token = jwt.sign({data: user}, cfg.secret, {expiresIn: 500000})

                res.json({
                    //Info the result
                    success: true,
                    msg: 'Login successful',
                    //return the token. Significant whitespace after JWT!
                    token: token,
                    //return the userdata to the client
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                    }
                })
            }
        })
    });
});
//passport.authenticate('jwt', {session: false})

router.post('/username', (req, res, next) => {
    console.log('WE ARE HERE')
    const username = req.body.username
    const email = req.body.email
    User.func.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        //console.log(user)
        if (user) {
            res.json({success: false, msg: 'Username already taken.'})
            return;
        }
        if(email){
            User.func.getUserByEmail(email, (err, user) => {
                if (err) throw err;
                //console.log(user)
                if (user) {
                    res.json({success: false, msg: 'Email already taken.'})
                    return;
                }
            })
        }
        res.json({success: true, msg: 'Both available'})
    })





})
//TODO NOT THIS
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    //console.log(req)
    res.json({user: req.user});
});

//Is this secure?
router.post('/usersave', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const wat = req.user
    const pname = req.body.pname
    const pzize = req.body.psize
    const remove = req.body.remove

    if(remove){
        User.func.removeFromUser(wat.username, pname, pzize)
        res.json({success: true, user: req.user.saved})
    }else{
        User.func.saveToUser(wat.username, pname, pzize)
        res.json({success: true, user: req.user})
    }


});

//this could be moved to /profile
router.get('/usersaved', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user.saved});
});





module.exports = router
