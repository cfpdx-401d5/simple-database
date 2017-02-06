const assert = require('assert');
const fs = require('fs');
const rimraf = require('rimraf');
const simpleid = require('simpleid');

const simpleDb = require('../lib/simple-db');

const db = simpleDb.create('./test-dir');

const testObject = {
    name: 'test'
};

const removeTestObject = {
    name: 'remove'
};


before(done => {
    rimraf('./test/created-dir', () => done());
});

describe('creates and deletes directory', () => {
    it('checks if directory is created', function() {
        simpleDb.create('./test/created-dir');
        fs.readdir('./test/created-dir', (err, files) => {
            if(err) return done(err);
            assert.equal(files, []);

            done();
        });
    });
    it('deletes the directory or actually checks to see if it exists', () => {
        fs.readdir('./test/created-dir', (err, files) => {
            assert.deepEqual(err.code, 'ENOENT');

            done();
        });
    });
});

describe('saves, updates, gets, gets all, and removes file', function() {
    it('saves file', done => {
        db.save('./test/created-dir/index.txt', testObject, (err, object) => {
            if(err) return done(err);
            assert.equal(object.name, testObject.name);
            done();
        });
    });
    it('updates file', done => {
        testObject.name = 'hello';
        db.update('./test/created-dir', testObject, (err, object) => {
            if(err) return done(err);
            assert.deepEqual(object.name, testObject.name);
            done();
        });

        testObject.name = 'test';
    })
});
