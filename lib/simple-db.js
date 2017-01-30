const fs = require('fs');
const path = require('path');
const simpleid = require('simpleid');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const simpleDb = {};

simpleDb.create = function(directory) {
    simpleDb.directory = directory;
};
       
simpleDb.save = function(table, objectToSave, cb) {
    objectToSave._id = simpleid();
    var filePath = path.join(simpleDb.directory, objectToSave._id + '.txt');
    var stringFile = JSON.stringify(objectToSave);
    fs.writeFile(filePath, stringFile, (err) => {
        if(err) cb(err);
        else cb(null, objectToSave._id);
        })          
    }

simpleDb.get = function(table, id, cb){
    fs.readFile(path.join(simpleDb.directory, id + '.json'), (err, data) => {
        if (err) cb(err);
        let objectToSave = JSON.parse(data);
        return cb(null, objectToSave);
    });
};    





