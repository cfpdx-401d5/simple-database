const fs = require('fs');
const path = require('path');
var mkdirp = require('mkdirp');
var shortid = require('shortid');

module.exports = {
    create: function(directory) {
        mkdirp(directory);

        return {
            save: function(table, data, cb) {
                if (data._id) return cb({error: 'id already exists'});
                data._id = shortid.generate();
                var filepath = path.join(directory, `${table}.json`)

                fs.writeFile(filepath, JSON.stringify(data), function(err) {
                    if(err) return cb(err);
                    cb(null, data);
                });
            },

            update: function(table, obj, cb) {
                const file = path.join(directory, `${table}.json`);
                
                fs.readFile(
                    file, 
                    (err, data) => {
                        if(err) return cb(err);
                        
                        data = JSON.parse(data);

                        if(data._id === obj._id) {
                            fs.writeFile( file, JSON.stringify(obj), err => {
                                if(err) return cb(err);
                                cb(null, obj);
                            });
                        }
                });
            },

            remove: function(table, id, cb) {
                const file = path.join(directory, `${table}.json`);

                fs.readFile(file, (err, data) => {
                    if(err) return cb(err);
                    if (JSON.parse(data)._id === id) {
                        fs.unlink(file, err => {
                            if(err) return cb(err);
                            cb(null, 1);
                        });
                    } 
                });
            },

            get: function(table, id, cb) {

                const file = path.join(directory, `${table}.json`);

                fs.readFile(file, (err, data) => {

                    data = JSON.parse(data);

                    if (data._id === id) {
                        cb(null, data);
                    }
                });
            },

            getAll: function(directory, cb) {
                fs.readdir(directory, (err, files) => {
                    if(err) return cb(err);

                    const results = [];
                    let count = files.length;

                    files.forEach((file) => {
                        const fileName = path.join(directory, file);
                        fs.readFile(fileName, (err, content) => {
                            if(err) return cb(err);

                            results.push(JSON.parse(content));
                            count--;
                            if(!count) {
                                cb(null, results);
                            }
                        });
                    });
                });
            }
        };
    }
};