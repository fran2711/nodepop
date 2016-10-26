/**
 * Created by Fran on 19/10/16.
 */

"use strict";

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let jwtAuth = require('../../lib/jwtAuth');
let sha = require('sha256');
let User = mongoose.model('User');
let config = require('../../config/local_config');
let emailValidator = require('email-validator');

// Authentication of user
router.post('/authenticate', function (req, res) {

    let email = req.body.email;
    let password = req.body.password;
    
    password = sha(password);

    User.findOne({email: email}, function (err, user) {
        
        if (err){
            return err;
        }

        if (!email){
            return console.log('Error in the email: ', err);
        }

        // Authentication
        if (password !== user.password){
            return console.log('Error in the password: ',err);
        }

        let token = jwt.sign({id: user._id},
            config.jwt.secret,
            {expiresIn: '2 days'});

        res.json({success: true, token: token});
    });
});


router.get('/authenticate', jwtAuth(), function (req, res) {

    res.json({
        success: true,
        message: 'User authenticated with token'
    });

});

// Adding and saving a new user
router.post('/register', function (req, res, err) {

    let user = new User();
    
    if (!user.name || !user.email || !user.password){
        return console.log('Some parameters are missing. Error: ', err);
    }
    
    if (!emailValidator.validate(user.email)){
        return console.log('Some parameters are missing. Error: ', err);
    }
    
    user({
        name: req.body.name,
        email: req.body.email,
        password: sha(req.body.password)
    });
    
    
    user.save(function (err, saved) {

        if (err){
            return console.log('Error saving the user: ', err);
        }

        console.log(saved);
        res.json({success: true, message: saved});

    });
});



module.exports = router;