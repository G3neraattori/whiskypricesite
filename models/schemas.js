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

    email: {type: String}
});


const User = module.exports = mongoose.model('User', UserSchema)

module.exports.func = {

    getUserById: function (id, res){
        User.findById(id, res);
    },

    getUserByUsername: function (id, res) {
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
    }

};