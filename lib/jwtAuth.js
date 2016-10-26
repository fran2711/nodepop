/**
 * Created by Fran on 25/10/16.
 */

"use strict";

let jwt = require('jsonwebtoken');
let configJWT = require('../config/local_config');

module.exports = function () {
    return function (req, res, next) {
        
        let token = req.body.token || req.query.token || req.headers['x-access-token'];
        
        if (token){
            jwt.verify(token, configJWT.secret, function (err, decoded) {
               
                if (!err){
                    req.decode = decoded;
                    console.log('decoded', decoded);
                    next();
                }else {
                    return res.json({ok: false, error:{ code: 401,
                                                        message: 'Failed to authenticate token'}});
                }
            });
        }else {
            return res.status(403).json({
                ok: false,
                error: {code: 403,
                        message: 'No token provided'}
            });
        }
    };
};