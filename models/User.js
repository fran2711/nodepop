/**
 * Created by Fran on 19/10/16.
 */

"use strict";

let mongoose = require('mongoose');
let valid = require('validator');
let hash = require('hash.js');

let userSchema = mongoose.Schema({

    name: {type: String, index: true},
    email: {type: String, index: true},
    password: String
});

userSchema.statics.exists = function (iduser, cb) {
  
    User.findById(iduser, function (err, user) {
        if(err) return cb(err);
        return cb(null, user ? true : false);
    });
};

userSchema.statics.createRecord = function (nuevo, cb) {
  
    // Validaciones
    let valErrors = [];
    
    if (!(valid.isAlpha(nuevo.name) && valid.isLength(nuevo.name, 2))) {
        valErrors.push({field: 'name', message: __('validation_invalid', {field: 'name'}) });
    }
    
    if (!valid.isEmail(nuevo.email)) {
        valErrors.push({ field: 'email', message: __('validation_invalid', { field: 'email' }) });
    }
    
    if (!valid.isLength(nuevo.password, 6)) {
        valErrors.push({ field: 'password', message: __('validation_minchars', { num: '6' }) });
    }
    
    if (valErrors.length > 0) {
        return cb({ code: 422, errors: valErrors });
    }
    
    // Find duplicates and search the user
    User.findOne({email: nuevo.email}, function (err, user) {
       
        if (err){
            return cb(err);
        }
        
        // user already exists
        if (user){
            return cb({ code: 409, message: __('user_email_duplicated')})
        } else {
          
            // Make a hash of the password
            let hashedPass = hash.sha256().update(nuevo.password).digest('hex');
            
            nuevo.password = hashedPass;
            
            // Create the user
            new User(nuevo).save(cb);
        }
        
    });
    
};


var User = mongoose.model('User', userSchema);