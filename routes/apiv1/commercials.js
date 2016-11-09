/**
 * Created by Fran on 25/10/16.
 */

"use strict";

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Commercial = mongoose.model('Commercial');

const jwtAuth = require('../../lib/jwtAuth');
router.use(jwtAuth());

router.get('/', function (req, res, next) {
    
    
    const start = parseInt(req.query.start) || 0;
    const limit = parseInt(req.query.limit) || 1000; // it return 1000 register max.
    const sort = req.query.sort || '_id';
    const includeTotal = req.query.includeTotal === 'true';
    const filters = {};
    
    if (typeof req.query.tag !== 'undefined'){
        filters.tags = req.query.tags;
    }
    if (typeof req.query.sell !== 'undefined'){
        filter.sell = req.query.sell;
    }
    if (typeof req.query.price !== 'undefined' && req.query.price !== '-'){
        if (req.query.price.indexOf('-') !== -1){
            filters.price = {};
            let range = req.query.price.split('-');
            if (range[0] !== ''){
                filters.price.$gte = range[0];
            }
            
            if (range[1] !== ''){
                filters.price.$lte = range[1];
            }
        } else {
            filters.price = req.query.price;
        }
    }
    if (typeof req.query.name !== 'undefined'){
        filters.name = new RegExp('^' + req.query.name, 'i');
    }
    
    Commercial.list(start, limit, sort, includeTotal, filters).
    then(function (ads) {
        res.json({success: true, commercials: ads});
    }).catch(next);
    
});


router.get('/tags', function (req, res) {
    res.json({ ok: true, allowedTags: Commercial.allowedTags() });
});


module.exports = router;
