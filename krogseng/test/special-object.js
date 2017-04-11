// just to test selecting by id, so I know which id to search on
//write a .json file with knownn obj._id 
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

module.exports = function testUpdate(dir, table, obj, cb) {
    const filePath = path.join(dir, table + '.json');
    obj._id = 'updaterId';
    const jObj = JSON.stringify(obj);

    fs.writeFile(table, jObj, (err) => {
        if (err) {
            console.log('Write error on ', jObj);
        }
        return cb(null, jObj);
    }); // end writeFile
}; // end save