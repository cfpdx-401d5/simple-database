// get some tools
const fs = require('fs');
const path = require('path');


module.exports = function getAllFileContents(dir, cb) {
    fs.readdir(dir, (err, files) => {
        if (err) return cb(err);
        const results = [];
        console.log(files);
        cb(results);
    });

};

function callback(msg) {
    console.log('msg ', msg);
}