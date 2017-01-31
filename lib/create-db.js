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
//const results = [];

module.exports = function createDb(dir) {
    //if (!path.dirname(dir)) {
    mkdirp(dir);
    //if (err) return cb(err);
    // };

    return {
        // save the database object and return with new id
        save: function(dir, obj, cb) {
            const filePath = path.join('db-test-dir/more.json');
            if (obj._id) return cb({ error: "Object already exists" });

            obj._id = shortid.generate();
            var jObj = JSON.stringify(obj);

            fs.writeFile(dir, jObj, (err) => {
                if (err) {
                    console.log('Write error on ', jObj);
                }

                return cb(null, jObj);
            }); // end writeFile
        }, // end save

        update: function(dir, objId, cb) {
            const results = [];
            fs.readFile(filePath, (err, data) => {
                    if (err) return (err);
                    // read, parse, save to results, push new, stringify, write
                    // first test filePath
                    results.push(JSON.parse(data));

                    var whatLength = results.push(jObj);

                    fs.writeFile('db-test-dir/more.json', jObj, (err) => {
                        if (err) {
                            console.log('Write error on ', jObj);
                        }
                        return cb(jObj);
                    }); // end writeFile
                    return (null, results);
                }) //end readfile
        }, // end update

        get: function(dir, objId, cb) {
            let tempO = { holder: "from get" };
            return (tempO);
        },

        remove: function(dir, objId, cb) {
            let tempO = { holder: "from remove" };
            return (tempO);
        },


                return cb(jObj);
            });
        }, //save return


        // get an object using table name and id
        getAll: function getAllDirContents(dir, cb) {
                fs.readdir(dir, (err, files) => {
                    if (err) return cb(err);
                    cb(null, files);
                });
            } // end getAll


    }; // end return on createDb
}; //module exports return

//createDb(process.argv[2], process.argv[3], cb);
//var aNewDir = createDb(table, obj, cb);