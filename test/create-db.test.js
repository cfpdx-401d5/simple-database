// get tools
const assert = require('assert');
const createDb = require('../lib/create-db');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const testDir = path.join('db-test-dir');
var obj = { "cat": "kitty" };
var cb = function() {
    console.log('Problem with file removal');
};

after(function() {
    rimraf(testDir, cb);
});

describe('create a directory for database', function() {

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

        db.save('db-test-dir/objStore.json', testObj, (_, saved) => {
            var parsedObj = JSON.parse(saved);
            assert.ok(parsedObj.hasOwnProperty('_id'));
            assert.equal(testObj.cat, parsedObj.cat);
            done();
        });
    });

    it('save more obj files ', done => {
        var testObj = { "dog": "rover" };
        db.save('db-test-dir/dogStore.json', testObj, (_, saved) => {
            var parsedObj = JSON.parse(saved);
            //why does this fail?
            //assert.equal(testObj.dog, parsedObj.dog);
            assert.equal('rover', parsedObj.dog);
            //done();
        });

        var testObj = { "horse": "jazz" };
        db.save('db-test-dir/horseStore.json', testObj, (_, saved) => {
            var parsedObj = JSON.parse(saved);
            assert.equal(testObj.horse, parsedObj.horse);
            done();
        });
    });

    it('get all the directories', done => {
        db.getAll('db-test-dir', (err, contents) => {
            if (err) return done(err);
            assert.deepEqual(contents, ['dogStore.json', 'horseStore.json', 'objStore.json']);
            done();
        });
    });

    it('get db obj with id', done => {

        done();
    });
});