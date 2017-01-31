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
    const testDir = 'db-test-dir';
    const db = createDb(testDir);

    it('create new db object', done => {
        createDb(testDir, obj, (err, newDir) => {
            if (err) return done(err);
            assert.deepEqual(newDir, 'db-test-dir');
        });
        done();
    });

    it('save db obj ', done => {
        var testObj = { "cat": "kitty" };
        console.log('testobj', testObj);
        db.save('db-test-dir/objStore.json', testObj, (saved) => {
            var parsedObj = JSON.parse(saved);
            assert.ok(parsedObj.hasOwnProperty('_id'));
            assert.equal(testObj.cat, parsedObj.cat);
            done();
        });

    });

    it('get db obj with id', done => {
        console.log('getting with id');
        done();
    });

    after(function() {
        rimraf(testDir, cb);
    });
});