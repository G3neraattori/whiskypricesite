const express = require('express')
const router = express.Router()
const passport = require('passport')
const Datedata = require('../models/history')
const History = require('../models/historysubschema')
const jwt = require('jsonwebtoken')
const cfg = require('../configs/alkodbconfig')
const User = require("../models/schemas");

//TODO unify all the posts back to find without params -> move that to the service in frontend
router.post('/products', (req, res, next) => {

    const reqProduct = req.body.productName;
    const reqSize = req.body.bottleSize;


    Datedata.find()
        .populate({
            path: 'products',
            model: History,
            match: { productName: reqProduct, bottleSize: reqSize},
        })
        .exec(function (err, data){
            if (err) throw err;
            //console.log(data)
            res.json({
                success: true,
                msg: 'Data found',
                data: data
            });
        });
});


router.get('/allproducts', (req, res, next) => {

    Datedata.find()
        .populate({
            path: 'products',
            model: History,
            //match: {},
        })
        .exec(function (err, data){
            if (err) throw err;
            //console.log(data)
            res.json({
                success: true,
                msg: 'Data found',
                data: data
            });
        });
});






module.exports = router
