const fs = require('fs');
const path = require('path');
const simpleid = require('simpleid');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const table = process.argv[2];
const object = process.argv[3];

module.exports = function create(directory) {
    
    mkdirp(directory);
        
        return {  
            save: function(table, object, cb) {
                const filePath = path.join(directory, table + '.json');
                
                if (object._id) return cb({error: "already exists"});
                
                object._id = simpleid();
                
                const stringFile = JSON.stringify(object);
                //making a file
                fs.writeFile(filePath, stringFile, (err) => {
                    if(err) return cb(err);
                    return cb(null, stringFile);
                });          
            },

            update: function(table, object, cb) {
                const filePath = path.join(directory, table + '.json');

                if(!object._id) return cb ({ error: "not found" });
                else {
                    fs.readFile(filePath, (err, data) => {
                        let update = JSON.parse(data);

                        if(update._id === object._id) {
                            fs.writeFile(filePath, JSON.stringify(object), (err) => {
                                if (err) return cb(err);
                                else cb(null,object);
                            });
                        };
                    });
                };
            },


            get: function (table, objectId, cb) {
                //getting the file
                const filePath = path.join(directory, table + '.json');
                fs.readFile(filePath, (err, data) => {
                    let obj = JSON.parse(data);
                    return cb(null, obj);
                });
            },

            remove: function(table, objectId, cb) {
                const filePath = path.join(directory, table + '.json');

                fs.readFile(filePath, (err, data) => {
                    if (err) return cb({ error: "could not read file"});
                    else {
                        var remove = JSON.parse(data);
                        if (remove._id === objectId) {
                            fs.unlink(filePath, () => {
                                if (err) return cb(err);
                                else cb(null, 1);
                            });
                        };
                    };
                });
            },

            getAll: function (directory, cb) {
                fs.readdir(directory, (err, files) => {
                    if (err) return cb(err);
                    cb(null, files);
                });

            }


    };
};
