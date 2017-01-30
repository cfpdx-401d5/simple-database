// create a db if it doesn't exist
"use strict";
// make a module for each of the steps in api?
// get tools
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const table = process.argv[2];
const obj = process.argv[3];
const cb = process.stdout.write('callback ');

module.exports = function createDb(table, obj, cb) {
    //if (!path.dirname(table)) {
    mkdirp(table);
    //if (err) return cb(err);
    // };
    return (null, table);
};

//var aNewDir = createDb(table, obj, cb);