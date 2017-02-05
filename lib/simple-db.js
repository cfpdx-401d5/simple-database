const fs = require('fs');
const path = require('path');
const simpleid = require('simpleid');
const mkdirp = require('mkdirp');



module.exports = {
    create: function(directory) {
         mkdirp(directory, err => {
            if(err) console.log(err);
            else process.stdout.write('new database created\n');
        });
        
        return {  
            save: function(directory, object, cb) {                
                if (object._id) return cb({error: "already exists"});
                object._id = simpleid();
                
                const stringFile = JSON.stringify(object);
                
                fs.writeFile(directory, stringFile, (err) => {
                    if(err) return cb(err);
                    return cb(null, object);
                });          
            },

            update: function(directory, object, cb) {
                const filePath = path.join(directory, file);
                
                fs.readdir(directory, (err, files) => {
                    if(err) return cb(err);

                    files.forEach(file => {
                        fs.readFile(filePath, (err, data) => {
                            if(err) return cb(err);
                            if (JSON.parse(data)._id === object._id) {
                                const update = JSON.stringify(data);
                                fs.writeFile(file, update, err => {
                                if (err) return cb(err);
                                else return cb(null, JSON.parse(data));
                            });
                        } 
                    });
                });
            });
        },        


            get: function (directory, objectId, cb) {
                //getting the file
                const filePath = path.join(directory, file);
                fs.readdir(directory, (err, files) => {
                    if(err) return cb(err);

                    files.forEach(file => {
                        fs.readFile(filePath, (err, object) => {
                            if (JSON.parse(object)._id === id) return cb(null, JSON.parse(object));
                    });
                });
            });
        },

            remove: function(directory, objectId, cb) {
                const filePath = path.join(directory, file);
                fs.readdir(directory, (err, files) => {
                    if(err) return cb(err);

                    files.forEach(file => {
                        fs.readFile(filePath, (err, data) => {
                            if (err) return cb(err);
                            if (JSON.parse(data)._id === id) {
                                fs.unlink(filePath, err => {
                                    if(err) return cb(err);
                                    return cb(null, 1);
                                });
                            }
                        });
                    });
                })
            },

            getAll: function (directory, cb) {
                fs.readdir(directory, (err, files) => {
                    if (err) return cb(err);
                    
                    const results = [];
                    let count = files.length;

                    files.forEach((file, i) => {
                        const filePath = path.join(directory, file);
                        fs.readFile(filePath, { encoding: 'utf8'}, (err, content) => {
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
        }
    }
};

