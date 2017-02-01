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
            console.log('in update function', obj, obj._id);
            if (!obj._id) return cb({ error: "Object not found" });
            else {

                this.get(filePath, obj, (err, result) => {
                    result = obj;
                    process.stdout.write(` obj${obj}`);;
                    fs.readFile(filePath, (err, data) => {
                        //if (err) return (err);
                        let updated = JSON.parse(data).map((x) => {
                            if (x._d === result._id) return result;
                            else return x;
                        });

                        fs.writeFile(filePath, JSON.stringify(updated), (err) => {
                            if (err) {
                                console.log('Write error on ', jObj);
                            } else cb(null, result);
                        }); // end writeFile
                        // return (null, result);
                    }); //end readfile
                });
            };
        }, // end update

        get: function(table, objId, cb) {
            const filePath = path.join(dir, table + '.json');
            let tempO = { holder: "from get" };
            return (tempO);
        },

        remove: function(table, objId, cb) {
            const filePath = path.join(dir, table + '.json');
            let tempO = { holder: "from remove" };
            return (tempO);
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

//createDb(process.argv[2], process.argv[3], cb);
//var aNewDir = createDb(table, obj, cb);