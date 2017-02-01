// get tools
const assert = require('assert');
const createDb = require('../lib/create-db');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const testDir = path.join('db-test-dir');

// is this a bad thing
const testUpdate = require('./special-object.js');

const cb = function() {
    console.log('Problem with file removal');
};

after(function() {
    rimraf(testDir, cb);
});

describe('create a directory for database', function() {

    const db = createDb(testDir);

    it('create new db object', done => {
        createDb(testDir, (err, newDir) => {
            if (err) return done(err);
            assert.deepEqual(newDir, 'db-test-dir');
        });
        done();
    });

    it('save db obj ', done => {
        const testObj = { "cat": "kitty" };

        db.save('db-test-dir/objStore.json', testObj, (_, saved) => {
            let parsedObj = JSON.parse(saved);
            assert.ok(parsedObj.hasOwnProperty('_id'));
            assert.equal(testObj.cat, parsedObj.cat);
            done();
        });
    });

    it('save another obj files ', done => {
        let testObj = { "dog": "rover" };
        db.save('db-test-dir/dogStore.json', testObj, (_, saved) => {
            var parsedObj = JSON.parse(saved);
            assert.equal(testObj.dog, parsedObj.dog);
            done();
        });
    });


    it('save one more obj file', done => {
        let testObj = { "horse": "jazz" };
        db.save('db-test-dir/horseStore.json', testObj, (_, saved) => {
            var parsedObj = JSON.parse(saved);
            assert.equal(testObj.horse, parsedObj.horse);
            done();
        });
    });

    it('update an object with id', done => {

        let testObj = { "dog": "rover" };
        testObj._id = 'updaterId';
        testUpdate('db-test-dir/', 'updateStore', testObj, (err, result) => {
            done();
        });
        testObj.newProp = "furry";

        db.update('db-test-dir/updateStore.json', testObj, (err, result) => {
            process.stdout.write(`result ${result}`);
            assert.ok(result.hasOwnProperty('newProp'));
            done();

        });
    });

    it('get all the directories', done => {
        db.getAll('db-test-dir', (err, contents) => {
            if (err) return done(err);
            assert.deepEqual(contents, ['dogStore.json', 'horseStore.json', 'objStore.json'], 'updateStore.json');
            done();
        });

    });

    it('get db obj with id', done => {

        done();
    });


});