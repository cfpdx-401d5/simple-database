const fs = require('fs');

function createProgramDir(callback) {
    fs.readdir('.db-program', (err) => {
        if (err.code !== 'ENOENT') return callback(err);
        fs.mkdir('./db-program', (err, succ) => {
            callback(null, succ);
        });
    });
}


function createDBDir(obj, callback) {
    const path = './db-program/' + obj.database;
    fs.readdir(path, (err) => {
        if (err.code !== 'ENOENT') return callback(err);
        fs.mkdir(path, (err, succ) => {
            if (err) callback(err);
            createCollection(obj);
            callback(succ);
        });
    });
}

function createCollection(obj) {
    const path = './db-program/' + obj.database + '/' + obj.collection;
    if (!fs.existsSync(path)) {
        fs.mkdir(path, function() {
            createDocument(obj);
        });
    }
    createDocument(obj);
}

function createDocument(obj) {
    let path = './db-program/' + obj.database + '/' + obj.collection + '/';
    if (!fs.existsSync(path + obj._id + '.json')) {
        path += obj._id + '.json';
        const strObj = JSON.stringify(obj);
        fs.writeFile(path, strObj, function(err) {
            if (err) throw err;
        });
    }
}

module.exports = {
    createProgramDir,
    createDBDir
};