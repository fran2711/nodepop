/**
 * Created by Fran on 20/10/16.
 */

"use strict";

let mongoose = require('mongoose');
let platforms = require('../config/local_config').platform;
let User = mongoose.model('User');

let tokenSchema = mongoose.Schema({

    platform: {type: String, enum: platforms, index: true},
    token: {type: String, index: true},
    user: {type: String, index: true},
    createdAt: Date // For knowing which is the last of the user
});

tokenSchema.statics.createRecord = function (nuevo, cb) {
    
    // Validations
    let valErrors = [];
    if (!nuevo.token){
        valErrors.push({ field: 'token', message: __('validation_invalid')
        });
    }
    
    if (nuevo.platform){
        nuevo.platform = nuevo.platform.toLowerCase();
        if (!(nuevo.platform === 'ios' || nuevo.platform === 'android')){
            valErrors.push({field: 'platform', message: __('validation_invalid')
            });
        }
    } else {
      
        valErrors.push({field: 'platform', message: __('validation_invalid')
        });
    }
    
    if (valErrors.length > 0) return cb({code: 422, errors: valErrors });
    
    // If there is no user then is created without it
    if (!nuevo.user) return crear();
    
    User.exist(nuevo.user, function (err, exist) {
        
        if (err) return cb(err);
        
        // If the user don´t exist return an error
        if (!exist) return cb({code: 404, message: __('users_user_not_found')});
        
        return crear();
        
    });
    
    function crear() {
        nuevo.createdAt = new Date();
        new PushToken(nuevo).save(cb);
    }
};


var PushToken = mongoose.model('PushToken', tokenSchema);