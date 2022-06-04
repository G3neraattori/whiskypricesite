const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../configs/dbconfig')
const e = require("express");

const UserSchema = mongoose.Schema({
   username:{
       type: String,
       required: true,
   },

    password:{
       type: String,
       required: true,
    },

    email: {type: String},

    saved: []
});


const User = module.exports = mongoose.model('User', UserSchema)

module.exports.func = {

    getUserById: function (id, res){
        User.findById(id, res);
    },

    getUserByUsername: function (username, res) {
        const query = {username: username}
        User.findOne(query, res)
    },

    addUser: function (newUser, cb) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                    console.log(err)
                    throw err
                }
                newUser.password = hash;
                //why do we pass callback here?
                newUser.save(cb);
            });
        });
    },

    compareUserPassword: function (typedPassword, passwordHash , cb){
       bcrypt.compare(typedPassword, passwordHash, (err, res) =>{
           if(err) throw err;
           //what is this null for? Would work with just response
           cb(null, res);
       });
    },

    saveToUser: function (username, givenPname , givenPsize, cb){
        let save = { pname: givenPname, psize: givenPsize }

        User.updateOne(
            {username: username},
            {$addToSet: {saved: save}},
            cb,function(err) { console.log(err) });

    },

    removeFromUser: function (username, givenPname , givenPsize, cb){
        let save = { pname: givenPname, psize: givenPsize}

        User.updateOne(
            {username: username},
            {$pull: {saved: save}},
            cb,function(err) { console.log(err) });
    }
};

