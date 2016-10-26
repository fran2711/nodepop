/**
 * Created by Fran on 20/10/16.
 */

"use strict";

let mongoose = require('mongoose');
let platforms = require('../config/local_config').platform;

let tokenSchema = mongoose.Schema({

    platform: {type: String, enum: platforms, required: true},
    token: {type: String, required: true},
    user: {type: String, required: true}

});

mongoose.model('Token', tokenSchema);