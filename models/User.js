/**
 * Created by Fran on 19/10/16.
 */

"use strict";

let mongoose = require('mongoose');

let userSchema = mongoose.Schema({

    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}

});

mongoose.model('User', userSchema);