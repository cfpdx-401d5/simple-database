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

before(function(done) {
    rimraf(testDir, done);

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

        db.save('db-test-dir/updateStore.json', testObj, (_, saved) => {
            testObj = JSON.parse(saved);

            testObj.newProp = "furry";

            db.update('updateStore', testObj, (err, result) => {
                assert.ok(result.hasOwnProperty('newProp'));
                done();
            });
        });
    });

    it('get all the directories', done => {
        db.getAll('db-test-dir', (err, contents) => {
            if (err) return done(err);
            assert.deepEqual(contents, ['dogStore.json', 'horseStore.json', 'objStore.json', 'updateStore.json']);
            done();
        });

    });

    it('get db obj with id', done => {
        let testObj = { "horse": "jazz" };
        db.save('db-test-dir/getStore.json', testObj, (_, saved) => {
            testObj = JSON.parse(saved);

            db.get('getStore', testObj._id, (err, result) => {
                assert.deepEqual(testObj, result);
                done();
            });
        });

    });

    it('remove one object by id', done => {
        let testObj = { "lizard": "rover" };
        db.save('remStore', testObj, (_, saved) => {
            let parsedObj = JSON.parse(saved);

            db.remove('db-test-dir/remStore.json', parsedObj._id, (err, result) => {

                assert.ok(1, result);
                done();
            });
        })
    });

});