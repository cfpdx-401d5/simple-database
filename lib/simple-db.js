const fs = require('fs');
const path = require('path');
const simpleid = require('simpleid');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const simpleDb = {};

simpleDb.directory = undefined;

simpleDb.create = function(directoryName) {
    //creating the directory
    simpleDb.directory = directoryName;
};
       
simpleDb.save = function(table, objectToSave, cb) {
    objectToSave._id = simpleid();
    var filePath = path.join(simpleDb.directory, objectToSave._id + '.json');
    console.log(filePath);
    var stringFile = JSON.stringify(objectToSave);
    //making a file
    fs.writeFile(filePath, stringFile, (err) => {
        if(err) return cb(err);
        else cb(null, objectToSave);
    })          
}

simpleDb.get = function(table, id, cb){
    //getting the file
    fs.readFile(path.join(simpleDb.directory, id + '.json'), (err, data) => {
        if (err) return cb(err);
        let objectToSave = JSON.parse(data);
        return cb(null, objectToSave);
    });
};   




