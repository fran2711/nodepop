/**
 * Created by Fran on 25/10/16.
 */

"use strict";

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Commercial = mongoose.model('Commercial');

router.get('/', function (req, res, next) {
    
    let filter = {};
    let $regex;
    
    let name = req.query.name;
    let sell = req.query.sell;
    let tags = req.query.tags;
    let price = req.query.price;
    
    let limit = parseInt(req.query.limit) || null;
    let sort = req.query.sort || null;
    let fields = req.query.fields || null;
    let skip = parseInt(req.query.skip) || 0;
    
    
    if (typeof name !== 'undefined'){
        filter.name = name;
    }
    if (typeof sell !== 'undefined'){
        filter.sell = sell;
    }
    if (typeof tags !== 'undefined'){
        filter.tags = tags;
    }
    
    if (name){
        $regex = new RegExp('^' + name, 'i');
        filter.name = {$regex};
    }
    
    if (typeof price !== 'undefined'){
        
        let range = price.split('-');
        
        if (range.length === 1){
            filter.price = range[0];
        }else if(range.length === 2){
            if (!range[0]){
                filter.price = {$lt: range[1]};
            }
            else if (!range[1]){
                filter.price = {$gt: range[0]};
            }
            else {
                filter.price = {$gte: range[0], $lte: range[1]};
            }
        }else {
            
            filter.price = parseFloat(price);
        }
    }
    
    
    Commercial.list(filter, sort, limit, skip, fields).
    then(function (ads) {
        res.json({success: true, ads});
    }).catch(next);
    
});


module.exports = router;
