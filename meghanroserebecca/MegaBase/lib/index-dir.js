const fs = require('fs');
const path = require('path');
const simpleid = require('simpleid');

function Db(directory){
    this.directory = directory;
}

Db.prototype.save = function(fileName, file, callBack) {
    if (file.hasOwnProperty('_id')) return callBack({"error": "this file already exists!"});
    else {
        file._id = simpleid();
        var jsonFile = JSON.stringify(file);
        var filePath = path.join(this.directory, fileName);
        fs.writeFile(filePath, jsonFile, (err) => {
            if (err) callBack(err);
            callBack(null, file);
        })
    }
}

// function callback(err, file) {
//     if (err) return process.stdout.write(err.toString());
//     process.stdout.write(JSON.stringify(file) + ' It\'s Saved!');
// } 

Db.prototype.remove = function (directory, fileName, fileId, callback) {
  fs.readdir(directory, (err, files) => {
    if (err) return (err);
    let count = files.length;
    var deletedFilesCount = 0;
    files.forEach((file, i) => {
      const fileName = path.join(directory, file);
      fs.readFile(fileName, { encoding: 'utf8' }, (err, content) => {
        if(err) return callBack(err);
        var obj = JSON.parse(content);
        if(obj._id === fileId) {
            fs.unlink(fileName);
            deletedFilesCount++;
        }
        count--;
        if(!count) {
            callback(null, deletedFilesCount);
          }
      });
    });
  });
};

// function callback(err, deletedFilesCount) {
//     if (err) return process.stdout.write(err.toString());
//     process.stdout.write(deletedFilesCount + ' files removed!');
// } 

Db.prototype.update = function(fileName, file, callBack) {
    if (!file.hasOwnProperty('_id')) return callBack({"error": "this file does not exist!"});
    else {var filePath = path.join(this.directory, fileName);
        fs.readFile(filePath, (err, data) => {
        if(err) return callBack(err);
        var filePath = path.join(this.directory, fileName);
        var dataToAdd = JSON.stringify(file);
        fs.writeFile(filePath, dataToAdd, (err) => {
            if (err) callBack(err);
            callBack(null, dataToAdd);
    });
      });
    };
}

// function callback(err, dataToAdd) {
//     if (err) return process.stdout.write(err.toString());
//     process.stdout.write(dataToAdd + ' File Updated!');
// } 

Db.prototype.getAll = function(directory, callBack) {
    fs.readdir(directory, (err, files) => {
        if (err) return cb(err);

        const results = [];
        let count = files.length;
        files.forEach((file, i) => {
            const fileName = path.join(directory, file);
            fs.readFile(fileName, { encoding: 'utf8' }, (err, content) => {
                if(err) return callBack(err);

                results[i] = content;
                count--;
                if(!count) {
                    callBack(null, results);
                }
            });
        });
    });
};

Db.prototype.getDirContentsById = function(fileName, fileId, callBack) {
  const filePath = path.join(this.directory, fileName);
  fs.readFile(filePath, (err, data) => {
    if(err) return callBack(err);
    var obj = JSON.parse(data);
    if (obj._id !== fileId) return callBack('id does not match file id')
    callBack(null, obj);
  });
};

// function callback1(err, writeData) {
//     if (err) return process.stdout.write(err.toString());
//     process.stdout.write(writeData.toString());
// }

// function callback2(err, writeData) {
//     if (err) return process.stdout.write(err.toString());
//     process.stdout.write(writeData.toString());
// }

module.exports = {
    create: function(directory) {
        return new Db(directory); 
    }
}