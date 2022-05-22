const mongoose = require('mongoose')
const config = require('../configs/alkodbconfig')
const e = require("express");


const HistorySchema = new mongoose.Schema({
    productName: String,
    price: String,
    pricePerLiter: String,
    productType: String

}, {
    toJSON: {
        virtuals: true,
    },
});



const History = module.exports = mongoose.model('History', HistorySchema)

module.exports.addUser = function (newUser, cb) {
    //why do we pass callback here?
    newUser.save(cb);

}
