const simpleid = require('simpleid');

function DataObj(data) {
    for (var keys in data) {
        this[keys] = data[keys];
        this._id = simpleid();
    }
}

function createDataObj(data) {
    return new DataObj(data);
}

module.exports = {
    createDataObj,
};