const fs = require('fs');
const path = require('path');
var mkdirp = require('mkdirp');
var shortid = require('shortid');

module.exports = {
    create: function(directory) {
        mkdirp(directory, err => {
        });
        return {
            save: function(directory, data, cb) {
                if (data._id) return cb({error: 'id already exists'});
                data._id = shortid.generate();
                fs.writeFile(directory, JSON.stringify(data), function(err) {
                    if(err) return cb(err);
                    return cb(null, data);
                });
            },
            // update: function(directory, data, cb) {
            //     fs.readdir(directory, (err, files) => {
            //         if(err) return cb(err);

            //         files.forEach(file => {
            //             if (file._id === id) return file;
            //         });
            //     });
            // },
            get: function(directory, id, cb) {
                fs.readdir(directory, (err, files) => {
                    if(err) return cb(err);

                    files.forEach(file => {
                        fs.readFile(path.join(directory, file), (err, data) => {
                            if (JSON.parse(data)._id === id) return cb(null, JSON.parse(data));
                        });
                    });
                });
            },
            getAll: function(directory, cb) {
                fs.readdir(directory, (err, files) => {
                    if(err) return cb(err);

                    const results = [];
                    let count = files.length;

                    files.forEach((file, i) => {
                        const fileName = path.join(directory, file);
                        fs.readFile(fileName, { encoding: 'utf8' }, (err, content) => {
                            if(err) return cb(err);

                            results[i] = content;
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