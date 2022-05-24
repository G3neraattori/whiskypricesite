const express = require('express')
const router = express.Router()
const passport = require('passport')
const Datedata = require('../models/history')
const History = require('../models/historysubschema')
const jwt = require('jsonwebtoken')
const cfg = require('../configs/alkodbconfig')
const User = require("../models/schemas");


router.get('/products', (req, res, next) => {

    Datedata.find()
        .populate({
            path: 'products',
            model: History,
            match: { productName: 'Jameson', bottleSize: '0,7 l'},
        })
        .exec(function (err, data){
            if (err) throw err;
            console.log(data)
            res.json({
                success: true,
                msg: 'Data found',
                data: data
            });
        });
});






module.exports = router
