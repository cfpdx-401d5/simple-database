// get some tools
const fs = require('fs');
const path = require('path');


module.exports = function getAllDirContents(dir, cb) {
    fs.readdir(dir, (err, files) => {
        if (err) return cb(err);
        cb(null, files);
    });

};