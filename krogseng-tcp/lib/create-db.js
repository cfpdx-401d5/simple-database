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



module.exports = function createDb(dir) {
    //if (!path.dirname(dir)) {
    mkdirp(dir);
    //if (err) return cb(err);
    // };

    return {
        // save the database object and return with new id
        save: function(table, obj, cb) {
            const filePath = path.join(dir, table + '.json');
            if (obj._id) return cb({ error: "Object already exists" });

            obj._id = shortid.generate();
            const jObj = JSON.stringify(obj);

            fs.writeFile(table, jObj, (err) => {
                if (err) {
                    console.log('Write error on ', jObj);
                }
                return cb(null, jObj);
            }); // end writeFile
        }, // end save

        update: function(table, obj, cb) {
            const filePath = path.join(dir, table + '.json');

            if (!obj._id) return cb({ error: "Object not found" });
            else {
                fs.readFile(filePath, (err, data) => {
                    let toUpdate = JSON.parse(data);

                    if (toUpdate._id === obj._id) {
                        fs.writeFile(filePath, JSON.stringify(obj), (err) => {
                            if (err) return cb(err);
                            else cb(null, obj);
                        }); // end writeFile
                    }; // return (null, result);
                });
            };

        }, // end update

        get: function(table, objId, cb) {
            const filePath = path.join(dir, table + '.json');
            fs.readFile(filePath, (err, data) => {
                let gotObj = JSON.parse(data);
                return cb(null, gotObj);
            });

        },

        remove: function(table, objId, cb) {
            const filePath = path.join(dir, table + '.json');

            fs.readFile(filePath, (err, data) => {

                if (err) return cb({ error: "Could not read file" });
                else {
                    var notRemoved = JSON.parse(data);
                    if (notRemoved._id === objId) {
                        fs.unlink(filePath, () => {
                            if (err) return cb(err);
                            // return number of files removed
                            else cb(null, 1);
                        });
                    };
                };
            });
        },

        // get all the directories
        getAll: function getAllDirContents(dir, cb) {
                fs.readdir(dir, (err, files) => {
                    if (err) return cb(err);
                    cb(null, files);
                });
            } // end getAll


    }; // end return on createDb
}; //module exports return