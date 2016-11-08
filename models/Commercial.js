/**
 * Created by Fran on 19/10/16.
 */

/**
 * Commercial model
 */

"use strict";

let mongoose = require('mongoose');
let fs = require('fs');
let flow = require('../lib/flowControl');


// Created schema of commercials
let adSchema = mongoose.Schema({

    name: {type: String, index: true},
    sell: {type: Boolean, index: true},
    price: {type: Number, index: true},
    photo: String,
    tags: {type: [String], index: true}
});

/**
 * List of permitted tags
 */
adSchema.statics.allowedTags = function () {
    return ['work', 'lifestyle', 'motor', 'mobile'];
};

/**
 * commercials json
 */
adSchema.statics.cargaJSON = function (file, cb) {
  
    fs.readFile(file, {encoding: 'utf8'}, function (err, data) {
        if (err) return cb(err);
        
        console.log(file + ' readed.');
        
        if (data){
            let commercials = JSON.parse(data).ads;
            let numCommercials = commercials.length;
    
            flow.serialArray(anuncios, Anuncio.createRecord, (err)=> {
                if (err) return cb(err);
            return cb(null, numCommercials);
        });
            
        } else {
            return cb(new Error(file + ' is empty'));
        }
    });
};


// Creo un listado con los filtros que se le pueden pasar
adSchema.statics.list = function (startRow, numRows, sortField, includeTotal, filtes, cb) {
    
    let query = Commercial.find(filters);

    return new Promise(function (resolve, reject) {
        query.sort(sortField);
        query.limit(numRows);
        query.skip(startRow);
        query.select(fields);
        
        query.exec(function (err, result) {
            if (err){
                return reject(cb(err));
            }
            resolve(result);
            
            Commercial.count({}, (err, total) => {
               
                if (err) return cb(err);
            result.total = total;
            return cb(null, result);
                
            });
        });
    });
};


var Commercial = mongoose.model('Commercial', adSchema);