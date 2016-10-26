/**
 * Created by Fran on 23/10/16.
 */

"use strict";

let client = require('mongodb').MongoClient;
let fs = require('fs');


function install() {
    
    console.log('Executing installation');
    
    client.connect('mongodb://localhost:27017/nodepop', function (err, db) {
    
        if (err){
            return err;
        }
        
        console.log('Connected to database');
        
        console.log('Starting deleting database ---------------');
        console.log('Deleting advertisements collection');
        
        db.collection('advertisements').drop(function (err, status) {
            if (err) {
                console.log('Error deleting advertisements collection');
            }
            console.log('Advertisements collection deleted. Status: ' + status);
    
    
            console.log('Deleting users collection');
            db.collection('users').drop(function (err, status) {
                if (err) {
                    console.log('Error deleting users collection');
                }
                console.log('Users collection deleted. Status: ' + status);
                
    
                console.log('Deleting tokens collection');
                db.collection('tokens').drop(function (err, status) {
                    if (err) {
                        console.log('Error deleting tokens collection');
                    }
                    console.log('Tokens collection deleted. Status: ' + status);
                    
                    console.log('Finished deleting database ---------------');
    
                    insertData(db);
                });
            });
        });
    });
}

function insertData(db) {
    
    let json;
    
    fs.readFile(__dirname + '/advertisements.json', 'utf8', function (err, data, next) {
        if (err){
           return err;
        }
        console.log('Advertisements loaded');
        
        json = JSON.parse(data);
        
        console.log('Adding advertisements');
        db.collection('ads').insert(json).then(function () {
            console.log('Advertisements added');
        }).catch(next);
    });
    
    fs.readFile(__dirname + '/user.json', 'utf8', function (err, data, next) {
        if (err){
            return err;
        }
        console.log('Users loaded');
        
        json = JSON.parse(data);
        
        console.log('Adding users');
        db.collection('ads').insert(json).then(function () {
            console.log('Users added');
        }).catch(next);
    });
    
}

install();