/**
 * Created by Fran on 25/10/16.
 */

"use strict";

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Token = mongoose.model('Token');


router.post('/', function (req, res) {
    
    let token = new Token(req.body);
    
    token.save(function (err, saved) {
        
        if (err){
            
            return console.log('Error saving the token: ', err);
        }
        res.json({success: true, saved: saved});
    });
});


router.put('/', function (req, res) {
    let token = new Token(req.body);
    
    token.save(function (err, saved) {
        
        if (err){
            
            return console.log('Error saving the token: ', err);
            
        }
        res.json({success: true, saved: saved});
    });
});

module.exports = router;