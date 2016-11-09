/**
 * Created by Fran on 19/10/16.
 */

"use strict";

let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let User = mongoose.model('User');

let jwt = require('jsonwebtoken');
let jwtAuth = require('../../lib/jwtAuth');
let hash = require('hash.js');

let config = require('../../config/local_config');
let emailValidator = require('email-validator');

// Authentication of user
router.post('/authenticate', function (req, res) {

    let email = req.body.email;
    let password = req.body.password;
    

    User.findOne({email: email}, function (err, user) {
        
        if (err){
            return err;
        }
        
        if (!user){
            return res.json({
                ok: false, error:{
                    code: 401,
                    message: res.__('users_user_not_found')
                }
            });
        } else if (user) {
            
            let hashPass = hash.sha256().update(password).digest('hex');
            
            if (user.password != hashPass){
                return res.json({
                    code: 401,
                    message: res.__('user_wrong_password')
                });
            } else {
                
                let token = jwt.sign({ user: user}, config.jwt.secret, config.jwt.options);
                
                return res.json({ ok: true, token: token});
                
            }
        }
    });
});


// Adding and saving a new user
router.post('/register', function (req, res, next) {

    User.createRecord(req.body, function (err) {
        if (err) return next(err);
        
        return res.json({ok: true, message: res.__('users_user_created')});
    });
});



module.exports = router;