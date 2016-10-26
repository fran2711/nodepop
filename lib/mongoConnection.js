/**
 * Created by Fran on 25/10/16.
 */

"use strict";

let mongosee = require ('mongoose');
let connectDB = mongosee.connection;

mongosee.Promise = global.Promise;

connectDB.on('error', console.log.bind(console));

connectDB.once('opne', function () {
    console.log('Connected to MongoDB');
});

mongosee.connect('mongodb://localhost:27017/nodepop');

