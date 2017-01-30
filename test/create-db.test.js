// get tools
const assert = require('assert');
const createDb = require('../lib/create-db');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
var obj = { "cat": "kitty" };
var cb = function() {
    console.log('Problem with file removal');
};

describe('create a directory for database', function() {
    it('create new db object', done => {
        createDb('pickle', obj, (err, newDir) => {
            if (err) return done(err);
            assert.deepEqual(newDir, 'pickle');
        });
        done();
    });

    it('save db obj ', function() {

    });

    after(function() {
        rimraf('./pickle', cb);
    });
});