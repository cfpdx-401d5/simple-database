const fs = require('fs');
const path = ('path');
const simpleid = require('simpleid');

function save(directory, fileName, cb) {
    fileName._id = simpleid();
    var stringFile = JSON.stringify(fileName);
    fs.writeFile(directory, stringFile, (err) => {
        if(err) cb(err);
        else
            console.log('I wrote in a file');
    })
}

function callback(msg) {
    console.log(msg);
}

save('./index.txt', {"name": "claire"}, callback);

