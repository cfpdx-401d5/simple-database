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
            save: function(table, object, cb) {
                var filePath = path.join(directory, table + '.json');

                fs.readFile(filePath, (err, data) => {
                    if (!data) {
                        if (object.hasOwnProperty('_id')) return cb(err);
                        else {
                            object._id = simpleid();
                            const json = JSON.stringify([object]);
                            const savePath = path.join(directory, table + '.json')

                            fs.writeFile(savePath, json, (err) => {
                                if (err) cb(err);
                                else cb(null, object)
                            })
                        }
                    } else {
                        if (object.hasOwnProperty('_id')) return cb(err);
                        else {
                            object._id = simpleid();
                            const savePath = path.join(directory, table + '.json');
                            var newStuff = JSON.parse(data);
                            newStuff.push(object);

                            fs.writeFile(savePath, JSON.stringify(newStuff), (err) => {
                                if (err) cb (err);
                                else cb(null, object);
                            })
                        }
                    }
                })
            },

            update: function(table, object, cb){
                const savePath = path.join(directory, table + '.json');
                
                if(!object._id) return cb(err);  
                else { 
                    this.get(savePath, object._id, (err, result) => {
                        result = object; 
                        fs.readFile(savePath, (err, data) => {
                            var updatedData = JSON.parse(data).map((x) =>{
                                if (x._id === result._id) return result;
                                else return x;
                            });
                            fs.writeFile(savePath, JSON.stringify(updatedData), (err) => {
                                if (err) cb(err);
                                else cb(null, result); 
                            })
                        })
                    })
                }
            },
            
            get: function (table, id, cb) {
                //getting the file
                const savePath = path.join(directory, table + '.json');
                fs.readFile(savePath, (err, data) => {
                    if(err) cb(err);
                    else {
                        cb (
                            null, 
                            JSON.parse(data).filter((val) => {
                            if (val._id === id) return val;
                            })[0]
                        );
                    };
                });
            },
            
            getAll: function(table, cb) {
                const savePath = path.join(directory, table + '.json');
                fs.readFile(savePath, (err, data) => {
                    if(err) cb(err);
                    else {
                        cb(null, JSON.parse(data)); 
                    };
                });
            },

            remove: function(table, id, cb){
                const savePath = path.join(directory, table + '.json');
                fs.readFile(savePath, (err, data) => {
                    if(err) cb(err);
                    else {
                        var not = JSON.parse(data).map((obj) => {
                            if(obj._id !== id) return x;
                            
                        })
                        not.sort().pop(); 

                        fs.writeFile(savePath, JSON.stringify(not), (err) => {
                            if(err) cb(err) 
                            else cb(null, JSON.parse(data).length - not.length);
                        })
                    }          
                })                
            }
        }
    }
};

