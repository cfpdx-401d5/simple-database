const fs = require('fs');
const path = require('path');
const simpleid = require('simpleid');
const mkdirp = require('mkdirp');

//function callback(msg) {
    //console.log(msg);
//}

//save('./index.txt', {"name": "claire"}, callback);
module.exports = {
    create(directory) {
        mkdirp(directory, (err) => {
            if (err) return process.stdout.write(err);
            else process.stdout.write('directory made');
        })
        return {
            save(table, objectToSave, cb) {
                objectToSave._id = simpleid();
                var stringFile = JSON.stringify(objectToSave);
                var filePath = path.join(directory, table + '.txt');
                fs.writeFile(filePath, stringFile, (err) => {
                if(err) cb(err);
                else cb(null, 'I wrote in a file');
                })          
            }            
        }
    }
}



