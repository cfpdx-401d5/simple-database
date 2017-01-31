const fs = require('fs');
const path = require('path');
const simpleid = require('simpleid');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

module.exports = {
    create: function (directory) {
        mkdirp(directory, err => {
            if(err) console.log(err);
            else process.stdout.write('directory made');
        });
        
        return {  
            save: function(table, objectToSave, cb) {
                if (objectToSave.hasOwnProperty('_id')) return cb({error: "already exists"});
                objectToSave._id = simpleid();
                var filePath = path.join(directory, table + '.json');
                var stringFile = JSON.stringify(objectToSave);
                //making a file
                fs.writeFile(filePath, stringFile, (err) => {
                if(err) return cb(err);
                else cb(null, objectToSave);
                })          
            },


            get: function (table, id, cb) {
                //getting the file
                const filePath = path.join(directory, table + '.json');
                fs.readFile(filePath, (err, objectToSave) => {
                    if (err) cb(err);
                    else {
                        var parsedObj = JSON.parse(objectToSave)
                        if (id === parsedObj._id) {
                        cb (
                            null,
                            JSON.parse(objectToSave)
                            )}
                        }
                    })
                },

            getAll: function (table, cb) {

            }


        }
    }
}