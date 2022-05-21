const mongoose = require('mongoose')
const config = require('../configs/alkodbconfig')
const e = require("express");


const DateSchema = mongoose.Schema({
    date:{
        //or other type? Might be easiest as string for searching
        type: String,
        required: true,
    },
    products:[{
        productName: {
            type: String,
            required: true
        },
        price:{
            type: String,
            required: true,
        },
        pricePerLiter:{
            type: String,
            required: true,
        },
        productType: {type: String}
    }]
});


//const Datedata = mongoose.model('Datedata', DateSchema, 'dates');

const Datedata = module.exports = mongoose.model('Product', DateSchema)

module.exports.addUser = function (newUser, cb) {
    //why do we pass callback here?
    newUser.save(cb);

}
