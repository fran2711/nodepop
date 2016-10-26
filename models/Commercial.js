/**
 * Created by Fran on 19/10/16.
 */

"use strict";

let mongoose = require('mongoose');

// Creo el esquema del anuncio
let adSchema = mongoose.Schema({

    name: {type: String, required: true},
    sell: {type: Boolean, required: true},
    price: {type: Number, required: true},
    photo: String,
    tags: {type: String, enum:
        ['work', 'lifestyle', 'motor', 'mobile']
    }

});

// Creo un listado con los filtros que se le pueden pasar
adSchema.statics.list = function (filter, sort, limit, skip, fields) {

    return new Promise(function (resolve, reject) {
        let query = Commercial.find(filter);
        query.sort(sort);
        query.limit(limit);
        query.skip(skip);
        query.select(fields);
        query.exec(function (err, result) {
            if (err){
                return reject(err);
            }
            resolve(result);
        });
    });
};


let Commercial = mongoose.model('Commercial', adSchema);