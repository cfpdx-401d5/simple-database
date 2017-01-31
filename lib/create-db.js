// create a db if it doesn't exist
"use strict";
// make a module for each of the steps in api?
// get tools
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const shortid = require('shortid');
const table = process.argv[2];
const obj = process.argv[3];
const cb = process.stdout.write('callback ');

module.exports = function createDb(dir) {
    //if (!path.dirname(dir)) {
    mkdirp(dir);
    //if (err) return cb(err);
    // };

    return {
        // save the database object and return with new id
        save: function(dir, obj, cb) {
            if (obj._id) return cb({ error: "Object already exists" });
            obj._id = shortid.generate();
            var jObj = JSON.stringify(obj);
            fs.writeFile(dir, jObj, (err) => {
                if (err) {
                    console.log('Write error on ', jObj);
                }

                return cb(jObj);
            });
        }, //save return

        // get an object using table name and id
        get: function(dir, _id, cb) {
            console.log('in get function with obj id');
        }
    }; // end return on createDb
}; //module exports return

//createDb(process.argv[2], process.argv[3], cb);
//var aNewDir = createDb(table, obj, cb);