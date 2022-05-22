const mongoose = require('mongoose')
const config = require('../configs/alkodbconfig')
const e = require("express");
const {History} = require(__dirname +'/historysubschema.js')

/*const HistorySchema = mongoose.Schema({
    productName: String,
    price: String,
    pricePerLiter: String,
    productType: String

});*/

const DateSchema = mongoose.Schema({
    date:{
        //or other type? Might be easiest as string for searching
        type: String,
        required: true,
    },
    products:[{ type: mongoose.Schema.Types.ObjectId, ref: 'History' }]
})



//const Datedata = mongoose.model('Datedata', DateSchema, 'dates');

const Datedata = module.exports = mongoose.model('Product', DateSchema)

module.exports.addUser = function (newUser, cb) {
    //why do we pass callback here?
    newUser.save(cb);

}
